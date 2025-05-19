# KnForm for Vuetify

## Installation

```bash
npm install kn-v-form
```
Install vue plugin

```js
import { createApp } from 'vue'
import {dialogPlugin} from 'kn-v-form'

createApp(App).use(dialogPlugin).mount('#app')
```

## Usage

Use dialogPlugin in component

```js
import {useKnDialog} from 'kn-v-form'

const {
    select
} = useKnDialog()

select({
    options: [{value: 1, label: '1o'}]
}).then(() => {})
```

## Localization (use i18n)

```json
{
  "rules": {
    "required": "This field is required",
    "email": "Invalid email format",
    "notEmptyString": "This field is required",
    "engNumOnly": "Only English and numbers are allowed",
    "engNumSpecialOnly": "Only English, numbers and special characters are allowed (no space allowed)",
    "engNumSpecialSpaceOnly": "Only English, numbers and special characters are allowed",
    "numSpecialOnly": "Only numbers and special characters are allowed (no space allowed)",
    "notEqualsTo": "This value must not be equal to {v}",
    "passwordsNotEquals": "Passwords do not match",
    "counterMax": "Maximum {n} characters",
    "counterMin": "Minimum {n} characters",
    "counterEqual": "Exactly {n} characters",
    "counterMaxEqual": "Maximum {n} characters",
    "counterMinEqual": "Minimum {n} characters",
    "lenMaxEqual": "Maximum {n} item(s)",
    "lenMinEqual": "Minimum {n} item(s)",
    "numMaxEqual": "Maximum {num}",
    "numMinEqual": "Minimum {num}",
    "int": "Invalid number format",
    "float": "Invalid number format",
    "checked": "This field is required",
    "slug": "Invalid slug format"
  }
}
```