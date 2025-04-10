import b1 from '@/data/vocabs/b1.json';
import b2 from '@/data/vocabs/b2.json';
import b3 from '@/data/vocabs/b3.json';
import b4 from '@/data/vocabs/b4.json';
import b5 from '@/data/vocabs/b5.json';
import b6 from '@/data/vocabs/b6.json';
import b7 from '@/data/vocabs/b7.json';
import b8 from '@/data/vocabs/b8.json';

const vocabsData = {
    b1: b1,
    b2: b2,
    b3: b3,
    b4: b4,
    b5: b5,
    b6: b6,
    b7: b7,
    b8: b8,
}

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


    async importJSONFiles(numOfLessons = 0, lesson = '') {
        var jsonData = [];
        var fileName = '';
        var data = [];
        if (lesson == '') {
            for (let i = 1; i <= numOfLessons; i++) {
                try {
                    data = vocabsData[`b${i}`];
                    jsonData = [...jsonData, ...data] 
                } catch (error) {
                    console.error(`Error loading ${fileName}:`, error);
                }
            }
        }
        else {
            try {
                data = vocabsData[`b${lesson}`];
                jsonData = [...jsonData, ...data] 
            } catch (error) {
                console.error(`Error loading ${fileName}:`, error);
            }
        }
        return jsonData;
    }
}

export default new CommonFunction();

