export default function downloadFile(url: string, fileName: string): void {
  // Use the Fetch API to get the file from the URL
  fetch(url)
    .then(response => {
      // Check if the response is successful (status code 200)
      if (!response.ok) {
        throw new Error(`Failed to download file. Status: ${response.status}`);
      }

      // Convert the response to a blob
      return response.blob();
    })
    .then(blob => {
      // Create a link element
      const link = document.createElement('a');

      // Create a Blob URL for the blob
      const blobUrl = window.URL.createObjectURL(blob);

      // Set the link's href to the Blob URL
      link.href = blobUrl;

      // Set the download attribute to specify the file name
      link.download = fileName;

      // Append the link to the document
      document.body.appendChild(link);

      // Trigger a click event on the link to start the download
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);

      // Revoke the Blob URL to free up resources
      window.URL.revokeObjectURL(blobUrl);
    })
    .catch(error => {
      console.error('Error downloading file:', error);
    });
}