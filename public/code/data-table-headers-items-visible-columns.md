// headers prop
[{
  value: String, // "firstName"
  label: String, // "First Name"
  slot: String | null, // optional, custom component name, i.e. "my-custom-first-name-component"
  cssClasses: Array // optional, CSS classes that will be applied to the header and its columns
}, {
  value: String, // "lastName"
  label: String, // "Last Name"
  slot: String | null, // optional, custom component name, i.e. "my-custom-last-name-component"
  cssClasses: Array // optional, CSS classes that will be applied to the header and its columns
}, {
  value: String, // "age"
  label: String, // "Age"
  slot: String | null, // optional, custom component name, i.e. "my-custom-age-component"
  cssClasses: Array // optional, CSS classes that will be applied to the header and its columns
}]

// items prop
[{
  firstName: [String | Number | Array | Object | Boolean | null | undefined], // 'John'
  lastName: [String | Number | Array | Object | Boolean | null | undefined] // 'Smith',
  age: [String | Number | Array | Object | Boolean | null | undefined] // 25,
}]

// v-model:visible-columns (the toggle-columns prop must be set to true)
[
  'firstName',
  'lastName'
]
