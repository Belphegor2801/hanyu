class CommonFunction {
    getMainLoading() {
        const el = document.body.querySelector("#bloading");
    }

    mask() {
        const el = this.getMainLoading();
        if (el) {
            el.style.display = 'flex';
        }
    }

    unmask() {
        const el = this.getMainLoading();
        if (el) {
            el.style.display = 'none';
        }
    }
}

export default new CommonFunction();

