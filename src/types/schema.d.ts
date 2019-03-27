declare namespace GraphQL {
        
type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** date */
  Date: Date,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};


type CacheControlScope = 
  'PUBLIC' |
  'PRIVATE';


type Location = {
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  create?: Maybe<Scalars['Date']>,
  screens?: Maybe<Array<Screen>>,
  screenCount?: Maybe<Scalars['Int']>,
};

type Mutation = {
  turnOnScreen: Screen,
};


type MutationTurnOnScreenArgs = {
  screenID?: Maybe<Scalars['ID']>
};

type Project = {
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  created?: Maybe<Scalars['Date']>,
  locations: Array<Location>,
};

type Query = {
  projects: Array<Project>,
  locations: Array<Location>,
  loadLocation?: Maybe<Location>,
  screens: Array<Screen>,
  roles: Array<Role>,
};


type QueryProjectsArgs = {
  id: Scalars['ID']
};


type QueryLoadLocationArgs = {
  id?: Maybe<Scalars['ID']>
};


type QueryScreensArgs = {
  locationID?: Maybe<Scalars['ID']>
};

type Role = {
  id: Scalars['ID'],
  name: Scalars['String'],
};

type Screen = {
  turnedOn?: Maybe<Scalars['Boolean']>,
  id?: Maybe<Scalars['ID']>,
  type?: Maybe<ScreenType>,
  temperature?: Maybe<Scalars['Float']>,
};

type ScreenType = 
  'LCD' |
  'TV';

type Subscription = {
  screenUpdated: Screen,
};


type SubscriptionScreenUpdatedArgs = {
  locationID?: Maybe<Scalars['ID']>
};


    }