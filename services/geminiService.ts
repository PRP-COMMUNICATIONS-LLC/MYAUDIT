
import { GoogleGenAI, Type } from "@google/genai";
import { BankStatementData, BankProvider, ChatMessage, BusinessProfile, SupportedLanguage, AssistantPersona } from "../types";

const EXTRACTION_SYSTEM_INSTRUCTION = (selectedBank: BankProvider, lang: SupportedLanguage) => `
You are MYAUDIT, a world-class Forensic Audit AI specialized in Malaysian banking and tax compliance.
Output Language: ${lang === 'ms' ? 'Bahasa Malaysia' : lang === 'zh' ? 'Chinese' : 'English'}.
Bank Context: ${selectedBank}.

Your task is to perform a high-fidelity "Zero-Input" extraction of financial data from Malaysian bank statement images (e.g., CIMB, Maybank, RHB).

SPECIFIC FORENSIC RULES:
1. **Business Profile**: Locate the Legal Entity Name (e.g., "ACME SDN BHD"), Registration No (e.g., "202401012345" or old "123456-X"), and Tax Identification Number (TIN) from headers.
2. **Business Type**: Infer 'sdn_bhd', 'sole_proprietorship', 'partnership', 'llp', or 'bhd' from the entity name. 
3. **FYE (Financial Year End)**: Infer the FYE. If not clear, default to '31-12'.
4. **Transaction Grid**:
   - Dates: Extract exactly as written (e.g., "15 JAN 2024").
   - Columns: Detect 'Date', 'Description/Details', 'Reference/Cheque No', 'Withdrawal/Debit', 'Deposit/Credit', and 'Balance'.
   - Malaysian Specifics: Handle "Cheque No" as a separate reference if available.
5. **Audit Tagging**:
   - Categorize transactions into: 'revenue', 'expense', 'salary', 'epf_socso', 'loan_repayment', 'director_drawing', 'tax_payment', 'interbank_transfer', 'other'.
   - Assign 'counterparty_type': 'employee', 'director', 'vendor', 'government', 'related_company', 'unknown'.
6. **Reconciliation**: Calculate total movement (Deposits - Withdrawals) and compare with (Closing Balance - Opening Balance). List any discrepancies in 'issues'.

OUTPUT: Return ONLY a valid JSON object matching the provided schema. No markdown, no explanations.
`;

export const extractStatementData = async (base64Images: string[], bank: BankProvider, lang: SupportedLanguage): Promise<BankStatementData> => {
  // Use import.meta.env.VITE_GEMINI_API_KEY directly as per guidelines
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
  const imageParts = base64Images.map(data => ({ inlineData: { mimeType: 'image/jpeg', data } }));

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [{ 
        parts: [
          ...imageParts, 
          { text: `Extract forensic data from these Malaysian bank statement pages. Detect bank as ${bank === 'Auto-detect' ? 'automatic' : bank}. Return JSON.` }
        ] 
      }],
      config: {
        systemInstruction: EXTRACTION_SYSTEM_INSTRUCTION(bank, lang),
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            business_profile_snapshot: { 
              type: Type.OBJECT, 
              properties: { 
                legal_name: { type: Type.STRING }, 
                registration_number: { type: Type.STRING }, 
                business_type: { type: Type.STRING }, 
                tax_identification_number: { type: Type.STRING }, 
                financial_year_end: { type: Type.STRING } 
              }, 
              required: ["legal_name", "registration_number", "business_type", "tax_identification_number", "financial_year_end"] 
            },
            account_metadata: { 
              type: Type.OBJECT, 
              properties: { 
                bank_name: { type: Type.STRING }, 
                account_name: { type: Type.STRING }, 
                account_number: { type: Type.STRING }, 
                opening_balance: { type: Type.NUMBER }, 
                closing_balance: { type: Type.NUMBER }, 
                earliest_transaction_date: { type: Type.STRING }, 
                latest_transaction_date: { type: Type.STRING } 
              }, 
              required: ["bank_name", "account_name", "account_number", "opening_balance", "closing_balance", "earliest_transaction_date", "latest_transaction_date"] 
            },
            transactions: { 
              type: Type.ARRAY, 
              items: { 
                type: Type.OBJECT, 
                properties: { 
                  date: { type: Type.STRING }, 
                  description: { type: Type.STRING }, 
                  withdrawal_amount: { type: Type.NUMBER }, 
                  deposit_amount: { type: Type.NUMBER }, 
                  balance_after: { type: Type.NUMBER }, 
                  year_of_assessment: { type: Type.STRING }, 
                  financial_year_label: { type: Type.STRING }, 
                  financial_month_label: { type: Type.STRING }, 
                  audit_tags: { 
                    type: Type.OBJECT, 
                    properties: { 
                      type: { type: Type.STRING }, 
                      counterparty_type: { type: Type.STRING }, 
                      notes: { type: Type.STRING } 
                    }, 
                    required: ["type", "counterparty_type"] 
                  } 
                }, 
                required: ["date", "description", "balance_after", "audit_tags", "year_of_assessment", "financial_year_label", "financial_month_label"] 
              } 
            },
            financial_year_summaries: { 
              type: Type.ARRAY, 
              items: { 
                type: Type.OBJECT, 
                properties: { 
                  financial_year_label: { type: Type.STRING }, 
                  financial_year_end_date: { type: Type.STRING },
                  months: { 
                    type: Type.ARRAY, 
                    items: { 
                      type: Type.OBJECT, 
                      properties: { 
                        month_label: { type: Type.STRING }, 
                        start_date: { type: Type.STRING },
                        end_date: { type: Type.STRING },
                        total_deposits: { type: Type.NUMBER }, 
                        total_withdrawals: { type: Type.NUMBER }, 
                        by_audit_type: { 
                          type: Type.OBJECT, 
                          properties: { 
                            salary: { type: Type.NUMBER }, 
                            epf_socso: { type: Type.NUMBER }, 
                            director_drawing: { type: Type.NUMBER }, 
                            tax_payment: { type: Type.NUMBER }, 
                            loan_repayment: { type: Type.NUMBER }, 
                            revenue: { type: Type.NUMBER }, 
                            expense: { type: Type.NUMBER }, 
                            other: { type: Type.NUMBER } 
                          } 
                        } 
                      } 
                    } 
                  } 
                } 
              } 
            },
            reconciliation_info: { 
              type: Type.OBJECT, 
              properties: { 
                is_reconciled: { type: Type.BOOLEAN }, 
                calculated_movement: { type: Type.NUMBER }, 
                expected_movement: { type: Type.NUMBER },
                issues: { type: Type.ARRAY, items: { type: Type.STRING } }
              }, 
              required: ["is_reconciled", "calculated_movement", "expected_movement"] 
            }
          }
        }
      },
    });

    const text = response.text;
    if (!text) throw new Error("AI returned empty content.");
    return JSON.parse(text) as BankStatementData;
  } catch (err: any) {
    console.error("Extraction error:", err);
    throw new Error(err.message || "Failed to extract bank data.");
  }
};

export const inferPersona = async (userInput: string): Promise<AssistantPersona> => {
  // Always use { apiKey: import.meta.env.VITE_GEMINI_API_KEY } as per guidelines
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Route query to persona. 'tax' for taxation/LHDN, 'audit' for forensic/checks, else 'none'. Query: "${userInput}"`,
  });
  const result = response.text?.trim().toLowerCase();
  if (result?.includes('tax')) return 'tax';
  if (result?.includes('audit')) return 'audit';
  return 'none';
};

export const askAuditAssistant = async (
  query: string, 
  history: ChatMessage[], 
  data?: BankStatementData, 
  profile?: BusinessProfile, 
  lang: SupportedLanguage = 'en',
  persona: AssistantPersona = 'none'
): Promise<ChatMessage> => {
  // Always use { apiKey: import.meta.env.VITE_GEMINI_API_KEY } as per guidelines
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
  const context = data ? `Entity: ${data.business_profile_snapshot.legal_name}. TIN: ${data.business_profile_snapshot.tax_identification_number}.` : `No statement data loaded.`;

  let personaInstruction = "";
  if (persona === 'tax') {
    personaInstruction = "Persona: Mr RP (Tax Specialist). Focus: Malaysian LHDN compliance, tax planning, YA assessments, and allowable deductions.";
  } else if (persona === 'audit') {
    personaInstruction = "Persona: The Aoutha (Forensic Auditor). Focus: Reconciliation, forensic data verification, audit trails, and financial consistency.";
  } else {
    personaInstruction = "Persona: MYAUDIT General Assistant.";
  }

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: [
      { role: 'user', parts: [{ text: `Context: ${context}` }] },
      ...history.map(msg => ({ role: msg.role, parts: [{ text: msg.text }] })),
      { role: 'user', parts: [{ text: query }] }
    ],
    config: {
      systemInstruction: `${personaInstruction} Respond concisely in ${lang === 'ms' ? 'Bahasa Malaysia' : lang === 'zh' ? 'Mandarin' : 'English'}.`,
    },
  });

  return { role: 'model', text: response.text || "I'm sorry, I couldn't process that request." };
};
