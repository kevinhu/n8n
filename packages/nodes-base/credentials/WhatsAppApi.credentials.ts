import {
	IAuthenticateGeneric,
	ICredentialDataDecryptedObject,
	ICredentialTestRequest,
	ICredentialType,
	IHttpRequestOptions,
	INodeProperties,
	NodePropertyTypes,
} from 'n8n-workflow';

export class WhatsAppApi implements ICredentialType {
	name = 'whatsAppApi';
	displayName = 'WhatsApp API';
	documentationUrl = 'whatsApp';
	properties: INodeProperties[] = [
		{
			displayName: 'Access Token',
			type: 'string',
			name: 'accessToken',
			default: '',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.accessToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://graph.facebook.com/v13.0',
			url: '/',
			ignoreHttpStatusErrors: true,
		},
		rules: [
			{
				type: 'responseSuccessBody',
				properties: {
					key: 'error.type',
					value: 'OAuthException',
					message: 'Invalid access token',
				},
			},
		],
	};
}