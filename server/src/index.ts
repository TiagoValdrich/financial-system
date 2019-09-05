import cors from "cors";
import express, { NextFunction, Request, Response } from "express";

export class App {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.initialize();
    }

    private createMiddlewares(): Promise<object> {
        return new Promise((resolve, reject) => {
            try {
                this.app.use(cors());
                return resolve({
                    done: true,
                    error: null
                });
            } catch (error) {
                return reject({
                    done: false,
                    error
                });
            }
        });
    }

    private createRoutes(): Promise<object> {
        return new Promise((resolve, reject) => {
            try {
                this.app.get("/", (req: Request, res: Response, next: NextFunction) => {
                    return res.status(200).send("Hello World!");
                });

                return resolve({
                    done: true,
                    error: null
                });
            } catch (error) {
                return reject({
                    done: false,
                    error
                });
            }
        });
    }

    private initialize(): Promise<object> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.createMiddlewares();
                await this.createRoutes();
                this.app.listen("3000", () => {
                    return resolve({
                        done: true,
                        error: null
                    });
                });
            } catch (error) {
                return reject({
                    done: false,
                    error
                });
            }
        });
    }
}

const app = new App();
