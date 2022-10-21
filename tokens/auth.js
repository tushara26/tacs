const awsCognito = require("amazon-cognito-identity-js");

// IDとパスワード
const ID = "tac@fideltech.com";
const PW = "hzm#bz83eW";

// ユーザープール設定
const userPool = new awsCognito.CognitoUserPool({
	UserPoolId: "us-west-2_NqkuZcXQY",
	ClientId: "4l9rvl4mv5es1eep1qe97cautn",
});

// ユーザー決定
const cognitoUser = new awsCognito.CognitoUser({
	Username: ID,
	Pool: userPool,
});

// パスワードの設定
const authenticationDetails = new awsCognito.AuthenticationDetails({
    Password: PW,
});

// ユーザープール／ユーザー／パスワードを使って認証
cognitoUser.authenticateUser(authenticationDetails, {
	// 成功時
	onSuccess(result) {
		// 認証完了トークンを取得。以降はこのトークンで認証済み確認
		
		// console.log("Cognito Access Token : " + result.getAccessToken().getJwtToken());
		// console.log("\nClaris ID Token : " + result.idToken.jwtToken);
		// console.log("\nClaris ID Refresh Token : " + result.refreshToken.token);
		
		// return Claris ID Token
		console.log(result.idToken.jwtToken);
	},
	onFailure(err) {
		//console.error(err);
		console.error('Error');
	},
	// 二段階認証
	async mfaRequired(codeDeliveryDetails) {
		const verificationCode = await readUserInput(
		"Please input verification code : "
		);
		console.log("verification code = " + verificationCode);
		await cognitoUser.sendMFACode(verificationCode, this);
	},
});

// ユーザからのキーボード入力を取得する Promise を生成する
function readUserInput(question) {
	const readline = require("readline").createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	return new Promise((resolve, reject) => {
		readline.question(question, (answer) => {
		resolve(answer);
		readline.close();
		});
	});
}