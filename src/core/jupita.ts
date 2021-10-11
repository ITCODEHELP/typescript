import request from 'request';

import { JupitaEndpoint } from '../common/enums/jupita-endpoint.enum';
import { MessageType } from '../common/enums/message-type.enum';
// import { InvalidParameterException } from '../common/exceptions/invalid-parameter.exception';

export class Jupita {

    private readonly token: string;
    private readonly touchpointId: string;

    constructor(token: string, touchpointId: string) {
        this.token = token;
        this.touchpointId = touchpointId;
    };

    public dump(
      text: string,
      inputId: number,
      messageType: number = MessageType.Touchpoint,  
      isCall: boolean = false,
      listener?: Listener
    ) {
        // if (messageType !== MessageType.Input) {
        //     throw new InvalidParameterException(`invalid input`)
        // }

        this.request(
          JupitaEndpoint.dump,
          {
              token: this.token,
              touchpoint_id: this.touchpointId,
              input_id: inputId,
              message_type: messageType,
              text,
              isCall
          },
          listener
        );
    }

    private request(url: string, options: any, listener?: Listener): void {
        request.post(url, {
            json: options,
            headers: {
                "content-type": "application/json"
            }
        }, (err, res, body) => {
            if(!listener) {
              return console.log('No listener supplied');
            }

            if(err || res.statusCode !== 200){
                listener.onError(res.statusCode.toString(), res.body)
            } else {
                listener.onSuccess(body)
            }
        })
    }

}
