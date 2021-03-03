// 'express' module is referenced in backend typing exports,
// but typescript should not try to resolve it.
// Your fontend application will never rely on express module.
declare module 'express';