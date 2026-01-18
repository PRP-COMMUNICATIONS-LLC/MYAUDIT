#!/bin/bash
# MYΛUDIT Clinical Guardian Audit Script v1.1
# Objective: Pre-flight verification of the Clinical App substrate.
# Authority: SENTINEL PROTOCOL v1.1.0 / MYA-TECH-020
# Usage: sh scripts/guardian-audit-clinical.sh [--major | --minor]

MODE=${1:-"--minor"}
PROJECT_ID="rpr-myaudit"
PRIMARY_SITE="rpr-myaudit"

echo "🛡️ SENTINEL: Initiating MYΛUDIT Clinical Audit ($MODE)..."
echo "------------------------------------------------"

# --- LAYER 1: GIT INTEGRITY ---
echo "🔍 Checking Git Status..."
STATUS=$(git status --porcelain)
if [ -n "$STATUS" ]; then
    echo "⚠️ ALERT: Local substrate is DIRTY."
    echo "$STATUS"
else
    echo "✅ Git Status: Clean."
fi

# --- LAYER 2: CONFIGURATION ALIGNMENT ---
echo "🔍 Verifying Clinical Configuration Substrates..."

# Note: Excludes the PMP-specific workflow
FILES=(".firebaserc" "firebase.json" "package.json")
for FILE in "${FILES[@]}"; do
    if [ -f "$FILE" ]; then
        echo "✅ Presence: $FILE"
    else
        echo "❌ MISSING: $FILE"
        exit 1
    fi
done

# --- LAYER 3: TARGET BINDING ---
if grep -q "$PRIMARY_SITE" .firebaserc; then
    echo "✅ Target Binding: $PRIMARY_SITE found in .firebaserc"
else
    echo "❌ BINDING ERROR: $PRIMARY_SITE mapping missing in .firebaserc"
    exit 1
fi

# --- LAYER 4: CONDITIONAL EXECUTION ---
if [ "$MODE" == "--major" ]; then
    echo "------------------------------------------------"
    echo "🏗️ DEEP CLINICAL SUBSTRATE AUDIT INITIATED"

    # 4.1 Build Verification
    echo "🔨 Executing Dry-run Build (Primary)..."
    npm run build:primary
    if [ $? -eq 0 ]; then
        echo "✅ Build: Success (dist generated)"
    else
        echo "❌ BUILD FAILED: Check vite.config.ts."
        exit 1
    fi

    # 4.2 Auth Pre-flight
    echo "🔐 Verifying Identity Handshake..."
    npx firebase-tools projects:list --project $PROJECT_ID > /dev/null
    if [ $? -eq 0 ]; then
        echo "✅ Identity: Sovereign Handshake Verified."
    else
        echo "❌ AUTH ERROR: Local identity not found."
        exit 1
    fi
else
    echo "------------------------------------------------"
    echo "⚡ LIGHT FORENSIC AUDIT COMPLETE"
fi

echo "------------------------------------------------"
echo "🏁 Clinical Repo aligned with PRD ✅"
exit 0
