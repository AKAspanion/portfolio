export default {
    methods: {
        textHover(event, end = false) {
            let _style = `translate3d(0px, 0px, 0px)`;
            let windowTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (!end) {
                let targetPos = event.target.getBoundingClientRect();
                let xThresold =
                    1 -
                    (targetPos.x + targetPos.width - event.pageX) /
                    targetPos.width,
                    yThresold =
                    1 -
                    (targetPos.y + windowTop + targetPos.height - event.pageY) /
                    targetPos.height;
                _style = `translate3d(${Math.floor(
                    xThresold * (targetPos.width / 4)
                )}px, ${Math.floor(
                    yThresold * (targetPos.height / 2)
                )}px, 0px)`;
            }
            event.target.style.transform = _style;
        },
    }
};