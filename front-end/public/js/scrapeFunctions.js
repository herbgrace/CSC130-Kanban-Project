async function saveShow(title, url, image) {
    try{
    const response = await fetch('http://localhost:3001/shows', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, url, image })
    });
    if (response.ok) {
        alert('Show saved successfully!');
    } else {
        alert('Failed to save show. Please try again.');
    }
    } catch (error) {
        console.error('Error saving show:', error);
        alert('An error occurred while saving the show. Please try again.');
    }
}