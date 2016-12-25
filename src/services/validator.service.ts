export class ValidatorService {
    /*
    ** Check if stirng value is empty
    */
    isEmpty(value: string): boolean {
        if (value == "") {
            return true;
        } else {
            return false;
        }
    }

    /*
    ** Check if is e-mail
    */
    isEmail(value: string): boolean {
        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        if (EMAIL_REGEXP.test(value)) {
            return true
        } else {
            return false;
        }
    }

    /*
    ** Check if string contains at least n characters
    */
    minLength(value: string, length: number): boolean {
        if (value.length >= length) {
            return true;
        } else {
            return false;
        }
    }

    /*
    ** Check if string contains less than n characters
    */
    maxLength(value: string, length: number): boolean {
        if (value.length <= length) {
            return true;
        } else {
            return false;
        }
    }

    /*
    ** Check if contains value in a specific range
    */
    intInRange(value: number, from: number, to: number): boolean {
        if (value >= from && value <= to) {
            return true;
        } else {
            return false;
        }
    }

    /*
    ** Check if value equals another value
    */
    isEqual(value: string, equals: string): boolean {
        if (value == equals) {
            return true;
        } else {
            return false;
        }
    }

    /*
    ** Check if value contains only letters
    */
    isAlpha(value: string): boolean {
        let ALPHA_REGEXP = /^[a-z]+$/i

        if (ALPHA_REGEXP.test(value)) {
            return true;
        } else {
            return false;
        }
    }
}