import { Injectable } from '@nestjs/common';
import {
  AbilityBuilder,
  InferSubjects,
  MongoAbility,
  RawRuleFrom,
  createMongoAbility,
} from '@casl/ability';

import { User } from 'src/users/user.schema';
import { Article, Comment } from 'src/articles/article.schema';
import { Plan } from 'src/plans/plan.schema';

export const Actions = {
  /** 'manage' is special keyword used in CASL. */
  Manage: 'manage',
  Create: 'create',
  Read: 'read',
  Update: 'update',
  Delete: 'delete',
} as const;
export type Actions = (typeof Actions)[keyof typeof Actions];

export const Subjects = [User, Article, Plan, Comment] as const;
export type Subjects = InferSubjects<(typeof Subjects)[number], true> | 'all';
type _ModelNames = Pick<(typeof Subjects)[number], 'modelName'>['modelName'];

export type AppAbilities = [Actions, Subjects];
export type AppAbility = MongoAbility<AppAbilities>;

export type AppRawRule = RawRuleFrom<AppAbilities, object>;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

type AppendPrefix<T, Prefix extends string> = {
  [P in keyof T as `${Prefix}.${string & P}`]: T[P];
};

type Entries<T> = { [P in keyof T]: [P, T[P]] }[keyof T];

type FlatEntry<
  T,
  Limit extends number = 1,
  NotToFlat = Date | Array<any> | ((...args: any) => any),
  Stack extends Array<any> = [],
> = T extends [infer K, infer V]
  ? V extends object
    ? Stack['length'] extends Limit
      ? T
      : V extends NotToFlat
      ? T
      : FlatEntry<
          Entries<AppendPrefix<V, string & K>>,
          Limit,
          NotToFlat,
          [any, ...Stack]
        >
    : T
  : never;

type TypeFromEntries<T> = UnionToIntersection<
  T extends [infer K, infer V] ? { [P in string & K]: V } : never
>;

type Merge<T> = { [P in keyof T]: T[P] };

type FlatProperties<
  T,
  Limit extends number = 1,
  NotToFlat = Date | Array<any> | ((...args: any) => any),
> = Merge<TypeFromEntries<FlatEntry<Entries<T>, Limit, NotToFlat>>>;

type FlatArticle = FlatProperties<Article>;
type FlatPlan = FlatProperties<Plan>;
type FlatComment = FlatProperties<Comment>;

@Injectable()
export class CaslAbilityFactory {
  createForAdmin() {
    const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    can('manage', 'all');

    return build();
  }

  createForUser(user: User) {
    const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

    can<User>('create', 'User');
    can<User>('read', 'User');
    can<User>('update', 'User', { userId: user.userId });
    can<User>('delete', 'User', { userId: user.userId });

    can<Article>('create', 'Article');
    can<Article>('read', 'Article');
    can<FlatArticle>('update', 'Article', { 'author.userId': user.userId });
    can<FlatArticle>('delete', 'Article', { 'author.userId': user.userId });

    can<Plan>('create', 'Plan');
    can<Plan>('read', 'Plan');
    can<FlatPlan>('update', 'Plan', { 'author.userId': user.userId });
    can<FlatPlan>('delete', 'Plan', { 'author.userId': user.userId });

    can<Comment>('create', 'Comment');
    can<Comment>('read', 'Comment');
    can<FlatComment>('update', 'Comment', { 'author.userId': user.userId });
    can<FlatComment>('delete', 'Comment', { 'author.userId': user.userId });

    return build();
  }
}
