import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { JwtService } from './jwt.service';
import { UserEntity } from 'src/api/users/user.entity';

export interface IAccessTokenPayload {
  id: number;
  email: string;
}

export interface IRefreshTokenPayload {
  id: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
  // user: UserType
}

export class InvalidVerificationToken extends Error {}

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(payload: IAccessTokenPayload): Promise<UserEntity> {
    return new UserEntity(); // create fake user - todo - rewrite
  }

  // private async getTokensFromOrg(org: OrganizationType) {
  //   const jwtPayload: IAccessTokenPayload = {
  //     id: org.id,
  //     email: org.auth.userEmail,
  //   };

  //   return {
  //     accessToken: await this.jwtService.sign(jwtPayload),
  //     refreshToken: await this.generateRefreshToken(org),
  //     myOrganization: org,
  //   };
  // }

  // /**
  //  * Creates a registration requests in DB with expiration date and verification code.
  //  *
  //  * @param data
  //  */
  // async requestRegistration(data: {
  //   email: string;
  // }): Promise<{ verificationCode?: string }> {
  //   const verificationCode = Math.random()
  //     .toString(36)
  //     .slice(-5);

  //   await firestore.collection('registrationRequest').add({
  //     email: data.email,
  //     verificationCode,
  //     used: false,
  //     expirationDate: moment()
  //       .add(1, 'day')
  //       .toDate(),
  //   });

  //   // todo - send confirmation email with link containing the verification token

  //   return {
  //     verificationCode:
  //       process.env.ENV === 'PRODUCTION' ? verificationCode : null, // return verification code immediately on non-prod envs
  //   };
  // }

  // /**
  //  * Creates and organization.
  //  *
  //  * @param data
  //  */
  // async completeRegistration(data: {
  //   verificationCode: string;
  //   organizationName: string;
  //   password: string;
  // }): Promise<ITokens> {
  //   // check whether this is a valid registration request
  //   const result = await firestore
  //     .collection('registrationRequest')
  //     .where('verificationCode', '==', data.verificationCode)
  //     .get();
  //   if (result.docs[0]) {
  //     const request = result.docs[0].data();
  //     if (request.used)
  //       throw new UnauthorizedException({
  //         code: '401',
  //         success: false,
  //         message: 'Verification code already used.',
  //       });
  //     if (request.data().expirationDate > moment().toDate())
  //       throw new UnauthorizedException({
  //         code: '401',
  //         success: false,
  //         message: 'Expired verification code.',
  //       });

  //     return this.getTokensFromOrg(
  //       await this.userServiceClient.createOrganization({
  //         userEmail: request.email,
  //         organizationName: data.organizationName,
  //         userPassword: data.password,
  //       }),
  //     );
  //   }
  // }

  // async signIn(data: { email: string; password: string }): Promise<ITokens> {
  //   return this.getTokensFromOrg(
  //     await this.userServiceClient.getOrganizationByCredentials(data),
  //   );
  // }

  // async generateRefreshToken(org: OrganizationType): Promise<string> {
  //   const ref = await firestore
  //     .collection('refreshTokens')
  //     .add({ organizationId: org.id, organizationName: org.name }); // todo - save expiration date

  //   const refreshToken = await this.jwtService.sign(
  //     {
  //       id: ref.id,
  //       issuedAt: new Date().toISOString(),
  //     },
  //     { expiresIn: this.config.refreshTokenExpiresIn },
  //   );

  //   return refreshToken;
  // }

  // async refreshAccessToken(refreshToken: string): Promise<ITokens> {
  //   const verifiedToken = await this.jwtService.verify<IRefreshTokenPayload>(
  //     refreshToken,
  //   );

  //   const storedToken = await firestore
  //     .collection('refreshTokens')
  //     .doc(verifiedToken.id)
  //     .get();

  //   if (!storedToken) {
  //     throw new UnauthorizedException('Invalid refresh token.');
  //   }

  //   const orgRef = await firestore
  //     .collection('organization')
  //     .where('id', '==', storedToken.data().organizationId)
  //     .get();
  //   const org = orgRef.docs[0];

  //   if (!org) {
  //     throw new NotFoundException('Organization does not exist.');
  //   }

  //   const digitooOrganization = (org.data() as unknown) as OrganizationType;

  //   const jwtPayload: IAccessTokenPayload = {
  //     id: org.data().id,
  //     email: org.data().email,
  //   };

  //   // invalidate old token
  //   await firestore
  //     .collection('refreshTokens')
  //     .doc(verifiedToken.id)
  //     .delete();

  //   return {
  //     accessToken: await this.jwtService.sign(jwtPayload),
  //     refreshToken: await this.generateRefreshToken(digitooOrganization),
  //     myOrganization: digitooOrganization,
  //   };
  // }
}
