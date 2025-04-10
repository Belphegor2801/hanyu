
class CommonFunction {
    getMainLoading() {
        const el = document.body.querySelector("#h-loader");
        return el;
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


    async importJSONFiles(numOfLessons = 0, filename = '') {
        var jsonData = [];
        for (let i = 1; i <= numOfLessons; i++) {
            const fileName = `../data/vocabs/b${i}.json`;
            try {
                const data = await import(`${fileName}`);
                jsonData = [...jsonData, ...data.default] // Gán dữ liệu vào đối tượng
            } catch (error) {
                console.error(`Error loading ${fileName}:`, error);
            }
        }

        return jsonData;
    }
}

export default new CommonFunction();

