document.addEventListener('DOMContentLoaded', () => {
    const flowerPot = document.getElementById('flower-pot');
    const headerTitle = document.querySelector('h1');
    const headerText = document.querySelector('p');
    let isBlooming = false;
    const maxFlowers = 5;

    // Initialize flowers in the vase
    for (let i = 0; i < maxFlowers; i++) {
        const flower = document.createElement('div');
        flower.className = 'flower';
        
        flower.innerHTML = `
            <div class="stem">
                <div class="petals">
                    <div class="petal"></div>
                    <div class="petal"></div>
                    <div class="petal"></div>
                    <div class="petal"></div>
                    <div class="petal"></div>
                </div>
            </div>
            <div class="leaf left"></div>
            <div class="leaf right"></div>
        `;

        // Add interaction listener
        flower.addEventListener('click', (e) => {
            if (!isBlooming) return; // Allow bubbling to body for the first bloom
            e.stopPropagation();
            if (!flower.classList.contains('bloomed')) return;
            triggerRhythmicDance(flower);
        });

        // Cleanup animation class
        flower.addEventListener('animationend', (e) => {
            if (e.animationName === 'rhythmBounce') {
                flower.classList.remove('dancing');
            }
        });

        flowerPot.appendChild(flower);
    }

    function triggerRhythmicDance(clickedFlower) {
        const flowers = document.querySelectorAll('.flower');
        const clickedIndex = Array.from(flowers).indexOf(clickedFlower);

        flowers.forEach((flower, index) => {
            // Stagger the animation based on distance from clicked flower
            const delay = Math.abs(index - clickedIndex) * 100;
            setTimeout(() => {
                flower.classList.remove('dancing');
                void flower.offsetWidth; // Trigger reflow
                flower.classList.add('dancing');
            }, delay);
        });
    }

    document.body.addEventListener('click', () => {
        if (isBlooming) return;
        
        isBlooming = true;
        headerText.textContent = "Watching our love grow...";
        headerText.style.color = "#ffffff";
        headerText.style.fontWeight = "600";
        
        startAutomaticBloom();
    }, { once: true }); // Only allow one click trigger

    function startAutomaticBloom() {
        const flowers = document.querySelectorAll('.flower');
        let currentFlower = 0;

        function bloomNext() {
            if (currentFlower < flowers.length) {
                flowers[currentFlower].classList.add('bloomed');
                currentFlower++;
                setTimeout(bloomNext, 1200); // Bloom every 1.2 seconds
            } else {
                // Final state
                setTimeout(() => {
                    headerText.textContent = "Our love has fully bloomed! ❤️";
                    headerTitle.textContent = "I Love You Forever";
                }, 1000);
            }
        }

        bloomNext();
    }

});
