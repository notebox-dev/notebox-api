# Contributing

## Database

**Create migration**

```
npm run typeorm:migration:generate -- <migration_name>
```

**Create database user**

```sh
createuser --interactive --pwprompt
```

**Add user to database**

```sh
createdb -O admin notebox_dev
```
