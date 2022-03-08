// Group By State
db.person.aggregate([
  { $match: { gender: 'female' } },
  { $group: { _id: { state: '$location.state' }, totalPersons: { $sum: 1 } } },
]);

// Group by State and sort in descending order of totalPersons
db.person.aggregate([
  { $match: { gender: 'female' } },
  { $group: { _id: { state: '$location.state' }, totalPersons: { $sum: 1 } } },
  { $sort: { totalPersons: -1 } },
]);

// Group by gender and find total person and average age per gender
db.person.aggregate([
  { $match: { 'dob.age': { $gt: 50 } } },
  {
    $group: {
      _id: { gender: '$gender' },
      totalPersons: { $sum: 1 },
      avgAge: { $avg: '$dob.age' },
    },
  },
  { $sort: { totalPersons: -1 } },
]);

// Project full name of person by converting first character of first and last name to upper case
db.person.aggregate([
  {
    $project: {
      _id: 0,
      gender: 1,
      fullName: {
        $concat: [
          { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
          {
            $substrCP: [
              '$name.first',
              1,
              {
                $subtract: [{ $strLenCP: '$name.first' }, 1],
              },
            ],
          },
          ' ',
          { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
          {
            $substrCP: [
              '$name.last',
              1,
              {
                $subtract: [{ $strLenCP: '$name.last' }, 1],
              },
            ],
          },
        ],
      },
    },
  },
]);

// Turning location into geoJSON object
db.person.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      email: 1,
      location: {
        type: 'Point',
        coordinates: [
          {
            $convert: {
              input: '$location.coordinates.latitude',
              to: 'double',
              onError: 0,
              onNull: 0,
            },
          },
          {
            $convert: {
              input: '$location.coordinates.latitude',
              to: 'double',
              onError: 0,
              onNull: 0,
            },
          },
        ],
      },
    },
  },
  {
    $project: {
      gender: 1,
      email: 1,
      location: 1,
      fullName: {
        $concat: [
          { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
          {
            $substrCP: [
              '$name.first',
              1,
              {
                $subtract: [{ $strLenCP: '$name.first' }, 1],
              },
            ],
          },
          ' ',
          { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
          {
            $substrCP: [
              '$name.last',
              1,
              {
                $subtract: [{ $strLenCP: '$name.last' }, 1],
              },
            ],
          },
        ],
      },
    },
  },
]);

// Adding DOB and age to project
db.person.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      email: 1,
      birthDate: {
        $convert: {
          input: '$dob.date',
          to: 'date',
        },
      },
      age: '$dob.age',
      location: {
        type: 'Point',
        coordinates: [
          {
            $convert: {
              input: '$location.coordinates.latitude',
              to: 'double',
              onError: 0,
              onNull: 0,
            },
          },
          {
            $convert: {
              input: '$location.coordinates.latitude',
              to: 'double',
              onError: 0,
              onNull: 0,
            },
          },
        ],
      },
    },
  },
  {
    $project: {
      gender: 1,
      email: 1,
      location: 1,
      birthDate: 1,
      age: 1,
      fullName: {
        $concat: [
          { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
          {
            $substrCP: [
              '$name.first',
              1,
              {
                $subtract: [{ $strLenCP: '$name.first' }, 1],
              },
            ],
          },
          ' ',
          { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
          {
            $substrCP: [
              '$name.last',
              1,
              {
                $subtract: [{ $strLenCP: '$name.last' }, 1],
              },
            ],
          },
        ],
      },
    },
  },
]);

// Understanding $isoWeekYear Operator
db.person.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      email: 1,
      birthDate: {
        $convert: {
          input: '$dob.date',
          to: 'date',
        },
      },
      age: '$dob.age',
      location: {
        type: 'Point',
        coordinates: [
          {
            $convert: {
              input: '$location.coordinates.latitude',
              to: 'double',
              onError: 0,
              onNull: 0,
            },
          },
          {
            $convert: {
              input: '$location.coordinates.latitude',
              to: 'double',
              onError: 0,
              onNull: 0,
            },
          },
        ],
      },
    },
  },
  {
    $project: {
      gender: 1,
      email: 1,
      location: 1,
      birthDate: 1,
      age: 1,
      fullName: {
        $concat: [
          { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
          {
            $substrCP: [
              '$name.first',
              1,
              {
                $subtract: [{ $strLenCP: '$name.first' }, 1],
              },
            ],
          },
          ' ',
          { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
          {
            $substrCP: [
              '$name.last',
              1,
              {
                $subtract: [{ $strLenCP: '$name.last' }, 1],
              },
            ],
          },
        ],
      },
    },
  },
  {
    $group: {
      _id: { birthYear: { $isoWeekYear: '$birthDate' } },
      numPersons: { $sum: 1 },
    },
  },
  {
    $sort: {
      numPersons: -1,
    },
  },
]);

// Pushing elements into newly created arrays

db.friends.aggregate([
  { $group: { _id: { age: '$age' }, allHobbies: { $push: '$hobbies' } } },
]);

// Understanding $unwind stage
db.friends.aggregate([
  { $unwind: '$hobbies' },
  { $group: { _id: { age: '$age' }, allHobbies: { $push: '$hobbies' } } },
]);

// Eliminating duplicate values
db.friends.aggregate([
  { $unwind: '$hobbies' },
  { $group: { _id: { age: '$age' }, allHobbies: { $addToSet: '$hobbies' } } },
]);

// Using projection with arrays
db.friends.aggregate([
  { $project: { _id: 0, examScore: { $slice: ['$examScores', 1, 1] } } },
]);

// Getting length of array
db.friends.aggregate([
  { $project: { _id: 0, numScores: { $size: '$examScores' } } },
]);

// Using the $filter operator
db.friends.aggregate([
  {
    $project: {
      _id: 0,
      scores: {
        $filter: {
          input: '$examScores',
          as: 'sc',
          cond: {
            $gt: ['$$sc.score', 60],
          },
        },
      },
    },
  },
]);

// Applying multiple operations to our array
db.friends.aggregate([
  { $unwind: '$examScores' },
  { $project: { _id: 1, name: 1, age: 1, score: '$examScores.score' } },
  { $sort: { score: -1 } },
  {
    $group: {
      _id: '$_id',
      name: { $first: '$name' },
      maxScore: { $max: '$score' },
    },
  },
  { $sort: { maxScore: -1 } },
]);

// Understanding bucket

db.person.aggregate([
  {
    $bucket: {
      groupBy: '$dob.age',
      boundaries: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      output: {
        numPersons: { $sum: 1 },
        averageAge: { $avg: '$dob.age' },
      },
    },
  },
]);

db.person.aggregate([
  {
    $bucketAuto: {
      groupBy: '$dob.age',
      buckets: 5,
      output: {
        numPersons: { $sum: 1 },
        averageAge: { $avg: '$dob.age' },
      },
    },
  },
]);

// Diving into additionl stages
db.person.aggregate([
  { $match: { gender: 'male' } },
  {
    $project: {
      _id: 0,
      gender: 1,
      name: { $concat: ['$name.first', ' ', '$name.last'] },
      birthdate: { $toDate: '$dob.date' },
    },
  },
  { $sort: { birthdate: 1 } },
  { $skip: 10 },
  { $limit: 10 },
]);

// Writing pipeline into a new collection
db.person.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      email: 1,
      birthdate: { $toDate: '$dob.date' },
      age: '$dob.age',
      location: {
        type: 'Point',
        coordinates: [
          {
            $convert: {
              input: '$location.coordinates.longitude',
              to: 'double',
              onError: 0.0,
              onNull: 0.0,
            },
          },
          {
            $convert: {
              input: '$location.coordinates.latitude',
              to: 'double',
              onError: 0.0,
              onNull: 0.0,
            },
          },
        ],
      },
    },
  },
  {
    $project: {
      gender: 1,
      email: 1,
      location: 1,
      birthdate: 1,
      age: 1,
      fullName: {
        $concat: [
          { $toUpper: { $substrCP: ['$name.first', 0, 1] } },
          {
            $substrCP: [
              '$name.first',
              1,
              { $subtract: [{ $strLenCP: '$name.first' }, 1] },
            ],
          },
          ' ',
          { $toUpper: { $substrCP: ['$name.last', 0, 1] } },
          {
            $substrCP: [
              '$name.last',
              1,
              { $subtract: [{ $strLenCP: '$name.last' }, 1] },
            ],
          },
        ],
      },
    },
  },
  // stores result in a new collection
  { $out: 'transformedPersons' },
]);

// Working with the $geoNear Stage

db.transformedPersons.aggregate([
  {
    $geoNear: {
      near: { type: 'Point', coordinates: [-18.4, -42.7] },
      maxDistance: 1000000,
      query: {
        age: { $gt: 30 },
      },
      distanceField: 'distance',
    },
  },
]);
