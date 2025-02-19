document.getElementById('drawStairsButton').addEventListener('click', () => {
    const stairsContainer = document.getElementById('stairsContainer');
    const stairs = document.getElementById('stairs');
    stairs.innerHTML = '';
    for (let i = 0; i < 10; i++) {
        const tread = document.createElement('div');
        tread.classList.add('tread');
        stairs.appendChild(tread);
    }
    stairsContainer.style.display = 'block';
    document.getElementById('climbStairsButton').style.display = 'block';
    const stickPerson = document.getElementById('stickPerson');
    stickPerson.style.display = 'block';
    stickPerson.style.bottom = '50px';
});

document.getElementById('climbStairsButton').addEventListener('click', () => {
    const stickPerson = document.getElementById('stickPerson');
    const treads = document.querySelectorAll('.tread');
    let step = 0;
    const interval = setInterval(() => {
        stickPerson.style.bottom = `${50 + step * 36}px`;
        stickPerson.src = step % 2 === 0 ? 'Images/right.png' : 'Images/left.png';
        step++;
        if (step > treads.length) {
            clearInterval(interval);
        }
    }, 500);
});
