export const numberWithCommas = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const smoothScroll = (targetEl: any, offset=-100, duration = 500) => {
    const target = document.querySelector(targetEl);
    if (!target) { return }
    const targetPosition = target.getBoundingClientRect().top + offset;
    const startPosition = window.pageYOffset;
    let startTime: any = null;

    const ease = function(t: any,b: any,c: any,d: any) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    const animation = function(currentTime: any){
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, targetPosition, duration);
        window.scrollTo(0,run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);
}
