class UserMenuController {
    constructor(gameGui, userDataModel) {
        this.gameGui = gameGui;
        this.userDataModel = userDataModel;
    }

    async showMenu() {
        const userMenuView = new UserMenuView(this.gameGui);
        await userMenuView.init();
        userMenuView.onOptionSelected = async (option) => {
            switch (option) {
                case 1:
                    // Create new user
                    // Add your create new user logic here
                    break;
                case 2:
                    // Connect user
                    // Add your connect user logic here
                    break;
                case 3:
                    // Play as guest
                    // We just continue like nothing happened because default is guest
                    userMenuView.dispose();
                    break;
                case 4:
                    // Watch cinematic
                    await this.showYoutubeVideoFullscreen('l_qAVfj-_08');
                    break;
                case 5:
                    // Read storyline
                    // Add your read storyline logic here
                    break;
            }
        };
    }

    async showYoutubeVideoFullscreen(videoId) {
        return new Promise((resolve) => {
            let player;
    
            const videoContainer = document.createElement('div');
            videoContainer.style.display = 'flex';
            videoContainer.style.justifyContent = 'center';
            videoContainer.style.alignItems = 'center';
            videoContainer.style.position = 'fixed';
            videoContainer.style.left = '0';
            videoContainer.style.top = '0';
            videoContainer.style.width = '100%';
            videoContainer.style.height = '100%';
            videoContainer.style.zIndex = '1000';
            videoContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            videoContainer.setAttribute('id', 'video-container');
            document.body.appendChild(videoContainer);

    
            const playerContainer = document.createElement('div');
            playerContainer.style.width = '80%';
            playerContainer.style.height = '80%';
            playerContainer.style.position = 'relative';
            // playerContainer.style.paddingBottom = '56.25%'; // Maintain 16:9 aspect ratio
            playerContainer.style.overflow = 'hidden';
            playerContainer.setAttribute('id', 'player');
            videoContainer.appendChild(playerContainer);

    
            function stopVideoAndClose() {
                if (player) {
                    player.stopVideo();
                }
                const videoContainer = document.getElementById('video-container');
                if (videoContainer) {
                    document.body.removeChild(videoContainer);
                }
                resolve();
            }
    
            videoContainer.addEventListener('click', stopVideoAndClose);
            document.addEventListener('keydown', stopVideoAndClose, { once: true });
    
            function onYouTubeIframeAPIReady() {
                player = new YT.Player('player', {
                    width: '100%',
                    height: '100%',
                    videoId: videoId,
                    playerVars: {
                        autoplay: 1,
                        controls: 0,
                        modestbranding: 1,
                        rel: 0,
                        showinfo: 0,
                        fs: 1,
                    },
                    events: {
                        'onReady': onPlayerReady,
                        'onStateChange': onPlayerStateChange,
                    }
                });                
            }
    
            function onPlayerReady(event) {
                event.target.playVideo();
            }
    
            function onPlayerStateChange(event) {
                if (event.data == YT.PlayerState.ENDED) {
                    stopVideoAndClose();
                }
            }            
    
            if (window.YT && window.YT.Player) {
                onYouTubeIframeAPIReady();
            } else {
                window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
            }
        });
    }    
}