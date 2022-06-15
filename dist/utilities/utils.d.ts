import { ObjectSchema } from 'joi';
declare const validateSchema: (schema: ObjectSchema<any>) => (req: {
    body: any;
}, res: {
    status: (arg0: number) => {
        (): any;
        new (): any;
        json: {
            (arg1: {
                status: string;
                errors: any;
            }): any;
            new (): any;
        };
    };
}, next: () => void) => any;
export default validateSchema;
