export const textLabels = {
  films: {
    text: [
      { name: 'description', hideLabel: true },
      { name: 'director' },
      { name: 'producer' },
      { name: 'release_date', label: 'Release Date' },
      { name: 'rt_score', label: 'Rotten Tomatoes Score' },
    ],
  },
  locations: {
    text: [
      { name: 'climate' },
      { name: 'terrain' },
      { name: 'surface_water', label: 'Surface Water' },
    ],
    links: ['residents', 'films'],
  },
  people: {
    text: [
      { name: 'gender' },
      { name: 'age' },
      { name: 'eye_color', label: 'Eye Color' },
      { name: 'hair_color', label: 'Hair color' },
    ],
    links: ['film', 'species'],
  },
  species: {
    text: [
      { name: 'eye_colors', label: 'Eye Colors' },
      { name: 'hair_colors', label: 'Hair Colors' },
    ],
    links: ['people', 'films'],
  },
  vehicles: {
    text: [
      { name: 'description', hideLabel: true },
      { name: 'vehicle_class', label: 'Vehicle Class' },
      { name: 'length' },
    ],
  },
};

export const relatedCategories = {
  films: [
    { category: 'people', label: 'Characters' },
    { category: 'species' },
    { category: 'locations' },
    { category: 'vehicles' },
  ],
  people: [
    { category: 'films', label: 'Appears in' },
    { category: 'species', label: 'Species' },
  ],
  locations: [
    { category: 'people', label: 'Residents', keyword: 'residents' },
    { category: 'films', label: 'Appears In' },
  ],
  species: [
    { category: 'people', label: 'Members' },
    { category: 'films', label: 'Appears in' },
  ],
  vehicles: [
    { category: 'people', label: 'Pilots' },
    { category: 'films', label: 'Appears in' },
  ],
};
