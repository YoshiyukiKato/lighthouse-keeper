export interface IConfiguration {
  loaders: ILoader[];
  reporters: IReporter[];
  chromeNum?: number;
  puppeteerConfig?: any;
  lighthouseConfig?: any;
}

export interface IReporter {
  write(result: any): void;
  close(): Promise<any>;
}

export interface ITarget {
  url: string;
  [key: string]: string;
}

export interface ILoader {
  load(): Promise<ITarget[]>;
}
