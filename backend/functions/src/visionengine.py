# REGIONAL LOCK: asia-southeast1 | FOUNDER APPROVAL REQUIRED FOR MODIFICATION

from google.cloud import vision

def process_statement(gcs_uri: str) -> str:
    """Processes a document stored in Google Cloud Storage using Vision API.

    Args:
        gcs_uri: The Google Cloud Storage URI of the document to process.

    Returns:
        The extracted text from the document.
    """

    # Explicitly configure the client to use the asia-southeast1 endpoint.
    client_options = {"api_endpoint": "asia-southeast1-vision.googleapis.com"}
    client = vision.ImageAnnotatorClient(client_options=client_options)

    image = vision.Image()
    image.source.image_uri = gcs_uri

    response = client.document_text_detection(image=image)

    return response.full_text_annotation.text
