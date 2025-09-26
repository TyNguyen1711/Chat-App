import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserResolver } from './user/user.resolver';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloDriver } from '@nestjs/apollo';
import { config } from 'process';
import { join } from 'path';

@Module({
  imports: [AuthModule, UserModule,
    GraphQLModule.forRoot({
      imports: [ConfigModule, AppModule],
      inject: [ConfigService],
      driver: ApolloDriver,
      useFactory: async (configService: ConfigService) => {
        return {
          playground: true,
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          sortSchema: true,
        }
    }
  }),
  ConfigModule.forRoot({
    isGlobal: true,
  })
  ],
  controllers: [AppController],
  providers: [AppService, UserResolver],
})
export class AppModule {}
