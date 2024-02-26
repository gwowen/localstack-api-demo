import * as cdk from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Function, Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class LocalstackApiGatewayStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const helloWorldLambda = new Function(this, 'helloWorldLambda', {
      runtime: Runtime.NODEJS_20_X,
      code: Code.fromAsset('src/helloWorldLambda'),
      handler: 'index.handler',
    });

    const api = new RestApi(this, 'myapi', {});
    const helloWorldLambdaIntegration = new LambdaIntegration(helloWorldLambda);
    const helloResource = api.root.addResource('hello');
    helloResource.addMethod("GET", helloWorldLambdaIntegration);
    new cdk.CfnOutput(this, "Endpoint", {value: `http://localhost:4566/restapis/${api.restApiId}/prod/_user_request_${helloResource.path}`})
  }
}
