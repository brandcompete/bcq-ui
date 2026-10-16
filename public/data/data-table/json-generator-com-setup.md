[
'{{repeat(2, 2)}}',
{
_id: '{{objectId()}}',
index: '{{index()}}',
guid: '{{guid()}}',
firstName: {
value: '{{ firstName() }}'
},
lastName: {
value: '{{ surname() }}'
},
gender: {
value: '{{gender()}}'
},
isActive: {
value: '{{ bool() }}'
},
balance: {
value: '{{floating(1000, 4000, 2, "$0,0.00")}}'
},
picture: {
value: 'http://placehold.it/32x32'
},
age: {
value: '{{integer(20, 40)}}'
},
eyeColor: {
value: '{{random("blue", "brown", "green")}}'
},
company: {
value: '{{company().toUpperCase()}}'
},
email: {
value: '{{email()}}'
},
phone: {
value: '+1 {{phone()}}'
},
random1: {
value: '{{ integer(100, 999) }}'
},
random2: {
value: '{{ integer(100, 999) }}'
},
random3: {
value: '{{ integer(100, 999) }}'
},
random4: {
value: '{{ integer(100, 999) }}'
},
address: {
value: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}'
},
about: {
value: '{{lorem(1, "paragraphs")}}'
},
created: {
value: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}'
},
modified: {
value: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}'
},
accessed: {
value: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}'
},
latitude: {
value: '{{floating(-90.000001, 90)}}'
},
longitude: {
value: '{{floating(-180.000001, 180)}}'
},
country: {
value: '{{ country() }}'
}
}
]
