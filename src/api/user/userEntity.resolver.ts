import { Args, Mutation, Query, Resolver, Subscription, Info, Context, CONTEXT, GqlExecutionContext, ResolveField, Parent, Int } from '@nestjs/graphql';
import { UserEntity } from 'src/models/user.entity';
import { LoginArgs, RegisterArgs } from './user.args';
import { LoginRes, RegisterRes, User } from './user.model';
import { UserService } from './user.service';
