import { Inject, Injectable } from '@nestjs/common';
import { rejects } from 'assert';
import { Client } from 'nestjs-soap';
import { resolve } from 'path';
import * as util from 'util';
import * as soap from 'soap';

@Injectable()
export class AppService {

  constructor(@Inject('MY_SOAP_CLIENT') private readonly mySoapClient: Client) {}
  getHello(): string {
    return 'Hello World!';
  }


  async callService(numero: number): Promise<string> {
    const url = 'https://www.dataaccess.com/webservicesserver/NumberConversion.wso?wsdl';
    const client = await soap.createClientAsync(url);
    const result = await client.NumberToWordsAsync({ubiNum: numero});
    return result[0].NumberToWordsResult;
  }








  async priceDelivery(): Promise<any>{
    return new Promise((resolve,reject) => {
      this.mySoapClient.NumberToWords({}, (err, res) => {
        if(res){
          const inspectedRes = util.inspect(res, { depth: null });
          resolve(inspectedRes);
        }else{
          reject(err);
        }
      })
    })
  }
}
