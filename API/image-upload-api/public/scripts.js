document.getElementById('upload-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const formData = new FormData();
  const imageInput = document.getElementById('image-input');
  const files = imageInput.files;

  for (let i = 0; i < files.length; i++) {
    formData.append('images', files[i]);
  }

  try {
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const results = await response.json();
    const productSection = document.getElementById('product-section');
    
    // Append new images to the existing grid
    results.forEach(result => {
      const gridItem = document.createElement('div');
      gridItem.classList.add('grid-item');

      const img = document.createElement('img');
      img.src = result.filePath;
      img.alt = 'Product Image';

      gridItem.appendChild(img);
      productSection.appendChild(gridItem);
    });
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to upload images');
  }
});
