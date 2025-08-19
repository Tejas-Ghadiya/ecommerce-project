import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLError } from 'graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // ✅ Database
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'ecommerce_db',
      autoLoadEntities: true,
      synchronize: true,
    }),

    // ✅ GraphQL
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: { dateScalarMode: 'timestamp' },
      path: '/graphql',
      formatError: (error: GraphQLError) => {
        return error?.extensions?.originalError || { message: error.message };
      },
    }),

    // ✅ Auth Module
    AuthModule,
  ],
  providers: [], // 👈 remove AuthService/AuthModule from here
})
export class AppModule {}
