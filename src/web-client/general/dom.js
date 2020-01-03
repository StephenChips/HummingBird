export function getTransitionDurationMs (el) {
    var text = window.getComputedStyle(el).transitionDuration;
    if (text.endsWith('ms')) {
        return Number(text.substring(0, text.length - 2));
    } else if (text.endsWith('s')) {
        return Number(text.substring(0, text.length - 1));
    } else {
        return 0;
    }
}
