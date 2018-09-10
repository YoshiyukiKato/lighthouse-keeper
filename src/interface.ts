export interface IConfiguration {
  targetLoaders: ITargetLoader[];
  reporters: IReporter[];
  chromeNum?: number;
  puppeteerConfig?: any;
  lighthouseConfig?: any;
}

export interface IReporter {
  open(): void;
  write(result: any): void;
  close(): Promise<any>;
}

export interface ITarget {
  url: string;
}

export interface ITargetLoader {
  load(): Promise<ITarget[]>;
}