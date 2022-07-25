declare const myLogger: (serviceName: string) => (req: express.Request, res: express.Response, next: any) => void;
export default myLogger;
