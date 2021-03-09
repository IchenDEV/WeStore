export default class PageObserver {
    $page;
    $key;
    constructor(page, key) {
        this.$page = page;
        this.$key = key;
    }
    notify(value) {
        this.$page.setData({
            [this.$key]: value,
        });
    }
}