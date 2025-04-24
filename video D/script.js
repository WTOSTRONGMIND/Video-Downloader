document.addEventListener('DOMContentLoaded', function() {
            const fetchBtn = document.getElementById('fetch-btn');
            const videoUrlInput = document.getElementById('video-url');
            const downloadOptions = document.getElementById('download-options');
            const qualityOptions = document.getElementById('quality-options');
            const videoPreview = document.getElementById('video-preview');
            const videoThumb = document.getElementById('video-thumb');
            const videoTitle = document.getElementById('video-title');
            const videoDuration = document.getElementById('video-duration');
            const videoViews = document.getElementById('video-views');
            const progressContainer = document.getElementById('progress-container');
            const progressBar = document.getElementById('progress');
            const progressText = document.getElementById('progress-text');
            const downloadBtn = document.getElementById('download-btn');
            
            // Platform cards click event
            document.querySelectorAll('.platform-card').forEach(card => {
                card.addEventListener('click', function() {
                    const platform = this.getAttribute('data-platform');
                    let exampleUrl = '';
                    
                    switch(platform) {
                        case 'youtube':
                            exampleUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
                            break;
                        case 'facebook':
                            exampleUrl = 'https://www.facebook.com/watch/?v=123456789';
                            break;
                        case 'instagram':
                            exampleUrl = 'https://www.instagram.com/p/ABC123/';
                            break;
                        case 'tiktok':
                            exampleUrl = 'https://www.tiktok.com/@user/video/123456789';
                            break;
                        case 'twitter':
                            exampleUrl = 'https://twitter.com/user/status/123456789';
                            break;
                        case 'vimeo':
                            exampleUrl = 'https://vimeo.com/123456789';
                            break;
                        case 'dailymotion':
                            exampleUrl = 'https://www.dailymotion.com/video/abc123';
                            break;
                        case 'soundcloud':
                            exampleUrl = 'https://soundcloud.com/user/track-name';
                            break;
                    }
                    
                    videoUrlInput.value = exampleUrl;
                    videoUrlInput.focus();
                });
            });
            
            // Fetch button click event
            fetchBtn.addEventListener('click', function() {
                const videoUrl = videoUrlInput.value.trim();
                
                if (!videoUrl) {
                    alert('Please enter a valid video URL');
                    return;
                }
                
                // Validate URL format
                if (!isValidUrl(videoUrl)) {
                    alert('Please enter a valid URL starting with http:// or https://');
                    return;
                }
                
                // Show loading state
                fetchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                fetchBtn.disabled = true;
                
                // Simulate API call with timeout
                setTimeout(function() {
                    // Reset button
                    fetchBtn.innerHTML = '<i class="fas fa-search"></i> Fetch';
                    fetchBtn.disabled = false;
                    
                    // Show download options
                    downloadOptions.style.display = 'block';
                    
                    // Populate quality options (simulated)
                    qualityOptions.innerHTML = '';
                    
                    const qualities = [
                        { quality: '1080p', format: 'MP4', size: '45.2 MB' },
                        { quality: '720p', format: 'MP4', size: '28.7 MB' },
                        { quality: '480p', format: 'MP4', size: '15.3 MB' },
                        { quality: '360p', format: 'MP4', size: '9.8 MB' },
                        { quality: 'Audio', format: 'MP3', size: '3.5 MB' },
                        { quality: 'Audio', format: 'WEBM', size: '4.2 MB' }
                    ];
                    
                    qualities.forEach((option, index) => {
                        const optionCard = document.createElement('div');
                        optionCard.className = 'option-card';
                        optionCard.innerHTML = `
                            <h4>${option.quality}</h4>
                            <p>${option.format}</p>
                            <small>${option.size}</small>
                        `;
                        
                        optionCard.addEventListener('click', function() {
                            document.querySelectorAll('.option-card').forEach(card => {
                                card.classList.remove('selected');
                            });
                            this.classList.add('selected');
                            
                            // Show video preview and info
                            videoPreview.style.display = 'block';
                            videoThumb.src = 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg';
                            videoTitle.textContent = 'Example Video Title';
                            videoDuration.textContent = 'Duration: 3:45';
                            videoViews.textContent = 'Views: 1,234,567';
                            
                            // Show progress container and download button
                            progressContainer.style.display = 'block';
                            downloadBtn.style.display = 'block';
                        });
                        
                        qualityOptions.appendChild(optionCard);
                    });
                }, 1500);
            });
            
            // Download button click event
            downloadBtn.addEventListener('click', function() {
                // Simulate download progress
                let progress = 0;
                progressText.textContent = 'Preparing download...';
                
                const interval = setInterval(function() {
                    progress += Math.random() * 10;
                    if (progress > 100) progress = 100;
                    
                    progressBar.style.width = progress + '%';
                    
                    if (progress < 30) {
                        progressText.textContent = 'Connecting to server...';
                    } else if (progress < 60) {
                        progressText.textContent = 'Downloading video...';
                    } else if (progress < 90) {
                        progressText.textContent = 'Processing video...';
                    } else {
                        progressText.textContent = 'Almost done...';
                    }
                    
                    if (progress === 100) {
                        clearInterval(interval);
                        progressText.textContent = 'Download complete!';
                        downloadBtn.innerHTML = '<i class="fas fa-check"></i> Download Complete';
                        
                        // Reset after 3 seconds
                        setTimeout(function() {
                            resetDownloader();
                        }, 3000);
                    }
                }, 300);
            });
            
            // Helper function to validate URL
            function isValidUrl(string) {
                try {
                    new URL(string);
                    return true;
                } catch (_) {
                    return false;
                }
            }
            
            // Reset downloader to initial state
            function resetDownloader() {
                downloadOptions.style.display = 'none';
                videoPreview.style.display = 'none';
                progressContainer.style.display = 'none';
                downloadBtn.style.display = 'none';
                progressBar.style.width = '0%';
                downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download Now';
                videoUrlInput.value = '';
                
                // Clear any selected options
                document.querySelectorAll('.option-card').forEach(card => {
                    card.classList.remove('selected');
                });
            }
        });