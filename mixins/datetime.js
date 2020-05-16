import * as moment from "moment";
export default {
    methods: {
        reformatDate(date, format) {
            return moment(date).format(format);
        }
    }
}
