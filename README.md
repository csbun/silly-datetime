# silly-datetime

Simple datetime formater

## Install

```
npm i silly-datetime --save
```

## Example

```javascript
var sd = require(silly-datetime);
sd.format(new Date(), 'YYYY-MM-DD HH:mm');
// 2015-07-06 15:10
```

## Usage

### .format(datetime, format)

Format a Date object to specified format

- datetime: Date Object
- format: formate string, default to 'YYYY-MM-DD HH:mm:ss'

Format | Example | Description
------ | ------- | -----------
`YYYY` | `2015`  | 4 digit year
`M MM` | `0..12` | Month number
`D DD` | `0..31` | Day of month
`H HH` | `0..23` | 24 hour time
`h hh` | `1..12` | 12 hour time used with `a A`.
`a A`  | `am pm` | Post or ante meridiem
`m mm` | `0..59` | Minutes
`s ss` | `0..59` | Seconds
