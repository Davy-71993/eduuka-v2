
import { Ad, Category, Chat, ChatMessage, Profile, Store, Notification, Feedback } from "./types";
import { setDate, today, yesterday } from "./utils";

/**
 * Mind the spellings in categories and sub categories
 */

export const categories : Category[] = [
    {
        id: 'xdhj56nm',
        name: 'Electronics',
        slug: 'electronics',
        sub_categories: [
            {
                id: '1',
                image: '/images/categories/electronics/home.jpg',
                name: 'Home & Kitchen Appliances',
                slug: 'home-kitchen-appliances',
                ads: [],
                extra_fields: 'condition, voltage rating, power in watts,  color, capacity'
            },
            {
                id: '2',
                image: '/images/categories/electronics/tvs.webp',
                name: 'Tvs',
                slug: 'tvs',
                ads: [],
                extra_fields: 'condition, voltage rating, power in watts,  color, size, scratches'
            },
            {
                id: '3',
                image: '/images/categories/electronics/fridges.jpg',
                name: 'Fridges',
                slug: 'fridges',
                ads: [],
                extra_fields: 'condition, voltage rating, power in watts,  color, capacity, scratches'
            },
            {
                id: '4',
                image: '/images/categories/electronics/parts.webp',
                name: 'Parts & Accessories',
                slug: 'parts-accessories-electronics',
                ads: [],
                extra_fields: 'condition, voltage rating, power in watts,  color'
            },
            {
                id: '5',
                image: '/images/categories/electronics/wiring.webp',
                name: 'Wiring & Electrical Installation',
                slug: 'wiring-electrical-installation',
                ads: [],
                extra_fields: 'condition, voltage rating, power in watts,  color'
            }
        ],
        image: '/images/categories/electronics/electronics.jpeg'
    }, {
        id: 'x098765rtgh',
        name: 'Vehicles & Tracks',
        image: '/images/categories/vehicles/vehicles.jpg',
        slug: 'vehicles-tracks',
        sub_categories: [
            {
                id: '1',
                image: '/images/categories/vehicles/cars.jpg',
                name: 'Cars',
                slug: 'cars',
                ads: [],
                extra_fields: 'condition, color, year of make, engine size, horse power, torque, fuel, fuel tank capacity, scratches, faults, steering, transmision, passengers, boot size, wheel size'
            },{
                id: '2',
                image: '/images/categories/vehicles/pickups.jpg',
                name: 'Pickups',
                slug: 'pickups',
                ads: [],
                extra_fields: 'condition, color, year of make, engine size, horse power, torque, fuel, fuel tank capacity, scratches, faults, steering, transmision, passengers, boot size, wheel size, load capacity, carbin'
            },{
                id: '3',
                image: '/images/categories/vehicles/buses.jpeg',
                name: 'Buses',
                slug: 'buses',
                ads: [],
                extra_fields: 'condition, color, year of make, engine size, horse power, torque, fuel, fuel tank capacity, scratches, faults, steering, transmision, passengers, boot size, wheel size'
            },{
                id: '4',
                image: '/images/categories/vehicles/trucks.jpg',
                name: 'Tracks & Trailers',
                slug: 'tracks-trailers',
                ads: [],
                extra_fields: 'condition, color, year of make, engine size, horse power, torque, fuel, fuel tank capacity, scratches, faults, steering, transmision, wheel size, trailers, passengers'
            },{
                id: '5',
                image: '/images/categories/vehicles/tractors.jpg',
                name: 'Tractors & Heavy Equipments',
                slug: 'tractors-heavy-equipments',
                ads: [],
                extra_fields: 'condition, color, year of make, engine size, horse power, torque, fuel, fuel tank capacity, scratches, faults, steering, transmision, wheel size, load capacity'
            },{
                id: '6',
                image: '/images/categories/vehicles/parts.jpg',
                name: 'Parts & Accessories',
                slug: 'parts-accessores-vehicles',
                ads: [],
                extra_fields: 'condition, color, year of make, engine size, horse power, torque, fuel, fuel tank capacity, scratches, faults, steering, transmision'
            }
        ],
    },  {
        id: 'ssrtgyhi',
        name: 'Furniture',
        image: '/images/categories/furniture/furniture.jpg',
        slug: 'furniture',
        sub_categories: [
            {
                id: '1',
                image: '/images/categories/furniture/chairs-table.webp',
                name: 'Chairs & Table',
                slug: 'chairs-tables',
                ads: [],
                extra_fields: 'condition, wood type, color, size, damages'
            },{
                id: '2',
                image: '/images/categories/furniture/kitchen.jpg',
                name: 'Kitchen',
                slug: 'kitchen',
                ads: [],
                extra_fields: 'condition, wood type, color, size, damages'
            },{
                id: '3',
                image: '/images/categories/furniture/office.jpg',
                name: 'Office',
                slug: 'office',
                ads: [],
                extra_fields: 'condition, wood type, color, size, damages'
            },{
                id: '4',
                image: '/images/categories/furniture/kids.jpg',
                name: 'Kids',
                slug: 'kids',
                ads: [],
                extra_fields: 'condition, wood type, color, size, damages'
            }
        ],
    }, {
        id: 'xhghj6nm',
        name: 'Property & Real Estates',
        image: '/images/categories/property-real-estates/property-real-estates.webp',
        slug: 'propert-real-estates',
        sub_categories: [
            {
                id: '1',
                image: '/images/categories/property-real-estates/forent.jpeg',
                name: 'Houses & Appartments for Rent',
                slug: 'house-appartments-for-rent',
                ads: [],
                extra_fields: 'condition, Area, selfcontained, toilets, bathrooms, bedrooms, kitchen, compound, floors'
            },{
                id: '2',
                image: '/images/categories/property-real-estates/forsale.jpeg',
                name: 'Houses & Appartments for Sale',
                slug: 'houses-appartments-for-sale',
                ads: [],
                extra_fields: 'condition, Area, selfcontained, toilets, bathrooms, bedrooms, kitchen, compound, floors, Land name'
            },{
                id: '3',
                image: '/images/categories/property-real-estates/space-forsale.jpeg',
                name: 'Land & Plots for Sale',
                slug: 'land-plots-for-sale',
                ads: [],
                extra_fields: 'condition, Area, Land name, Land Texture'
            },{
                id: '4',
                image: '/images/categories/property-real-estates/space-forent.jpeg',
                name: 'Space for Rent',
                slug: 'space-for-rent',
                ads: [],
                extra_fields: 'condition, Area'
            },
        ],
    }, {
        id: 'xhghj6ewwnm',
        name: 'Fashion',
        image: '/images/categories/fashion/fashion.webp',
        slug: 'fashion',
        sub_categories: [
            {
                id: '1',
                image: '/images/categories/fashion/female.jpg',
                name: 'Females',
                slug: 'females',
                ads: [],
                extra_fields: 'condition, size, color, Machine wash'
            },{
                id: '2',
                image: '/images/categories/fashion/male.jpg',
                name: 'Males',
                slug: 'males',
                ads: [],
                extra_fields: 'condition, size, color, Machine wash'
            },{
                id: '3',
                image: '/images/categories/fashion/shoes.jpg',
                name: 'Shoes',
                slug: 'shoes',
                ads: [],
                extra_fields: 'condition, size, color, Machine wash'
            },{
                id: '3',
                image: '/images/categories/fashion/babies.webp',
                name: 'Children & Babies',
                slug: 'children-babies',
                ads: [],
                extra_fields: 'condition, size, color, Machine wash'
            },{
                id: '4',
                image: '/images/categories/fashion/jewelry.webp',
                name: 'Jewelry & Wearables',
                slug: 'jewelry-wearables',
                ads: [],
                extra_fields: 'condition, size, color, Machine wash, make, material'
            },
        ],
    }, 
    // {
    //     // Under review
    //     id: 'xhftuiuwnm',
    //     name: 'Services',
    //     image: '/images/categories/laptops.webp',
    //     slug: 'services',
    //     sub_categories: [
    //         {
    //             id: '1',
    //             image: '/images/categories/laptops.webp',
    //             name: 'Jobs',
    //             slug: 'jobs',
    //             ads: [],
    //             extra_fields: 'Category, type, site'
    //         },{
    //             id: '2',
    //             image: '/images/categories/laptops.webp',
    //             name: 'Engineering',
    //             slug: 'engineering',
    //             ads: [],
    //             extra_fields: 'Category'
    //         },{
    //             id: '3',
    //             image: '/images/categories/laptops.webp',
    //             name: 'Medical',
    //             slug: 'medical',
    //             ads: [],
    //             extra_fields: ''
    //         },{
    //             id: '4',
    //             image: '/images/categories/laptops.webp',
    //             name: 'Education',
    //             slug: 'education',
    //             ads: [],
    //             extra_fields: ''
    //         },{
    //             id: '5',
    //             image: '/images/categories/laptops.webp',
    //             name: 'Repairs',
    //             slug: 'repairs',
    //             ads: [],
    //             extra_fields: ''
    //         },{
    //             id: '6',
    //             image: '/images/categories/laptops.webp',
    //             name: 'IT & Software',
    //             slug: 'it-software',
    //             ads: [],
    //             extra_fields: ''
    //         },{
    //             id: '7',
    //             image: '/images/categories/laptops.webp',
    //             name: 'Business',
    //             slug: 'business',
    //             ads: [],
    //             extra_fields: ''
    //         },{
    //             id: '9',
    //             image: '/images/categories/laptops.webp',
    //             name: 'CVs',
    //             slug: 'cvs',
    //             ads: [],
    //             extra_fields: ''
    //         },
    //     ],
    // }
    {
        id: 'xhfkjikpopuwnm',
        name: 'Computers',
        image: '/images/categories/computors/computors.jpg',
        slug: 'computers',
        sub_categories: [
            {
                id: '1',
                image: '/images/categories/computors/laptops.webp',
                name: 'Laptops',
                slug: 'laptops',
                ads: [],
                extra_fields: 'condition, make, color, ram, rom, procesor, speed, screen size, usb ports, battery capacity, external Battery, scratches'
            },{
                id: '2',
                image: '/images/categories/computors/desktop.jpg',
                name: 'Desktops',
                slug: 'desktops',
                ads: [],
                extra_fields: 'condition, make, color, ram, rom, procesor, speed, screen size, usb ports, scratches'
            },{
                id: '3',
                image: '/images/categories/computors/accessories.webp',
                name: 'Accessories',
                slug: 'computor-accessories',
                ads: [],
                extra_fields: 'condition, make, color'
            }
        ],
    }, {
        id: 'xhfkjikpopuwnm',
        name: 'Phones & Tablets',
        image: '/images/categories/phones-tablets/phones-tablets.jpeg',
        slug: 'phones-tablets',
        sub_categories: [
            {
                id: '1',
                image: '/images/categories/phones-tablets/phones.jpg',
                name: 'Cell Phones',
                slug: 'cell-phones',
                ads: [],
                extra_fields: 'condition, screen size, ram, rom, color, scratches, sim card slot, card size, battery capacity, battery size, battery type'
            },{
                id: '2',
                image: '/images/categories/phones-tablets/tablets.jpg',
                name: 'Tablets',
                slug: 'tablets',
                ads: [],
                extra_fields: 'condition, screen size, ram, rom, color, scratches, sim card slot, card size, battery capacity, battery size, battery type'
            },{
                id: '3',
                image: '/images/categories/phones-tablets/accessories.webp',
                name: 'Accessories',
                slug: 'phone-tablet-accessories',
                ads: [],
                extra_fields: 'condition, screen size, ram, rom, color, scratches'
            },
        ],
    }, 
    // {
    //     // Under review
    //     id: 'xhfkjikpopuwnm',
    //     name: 'Art & Craft',
    //     image: '/images/categories/desktops.webp',
    //     slug: 'art-craft',
    //     sub_categories: [],
    // },{
    //     // Under review
    //     id: 'xhfkjikpopuwnm',
    //     name: 'Stationary',
    //     image: '/images/categories/desktops.webp',
    //     slug: 'stationary',
    //     sub_categories: [
    //         {
    //             id: '1',
    //             image: '/images/categories/desktops.webp',
    //             name: 'Books and Novels',
    //             slug: 'books-novels',
    //             ads: [],
    //             extra_fields: 'Pages'
    //         },{
    //             id: '2',
    //             image: '/images/categories/desktops.webp',
    //             name: 'Scholastic',
    //             slug: 'sclarstic',
    //             ads: [],
    //             extra_fields: ''
    //         },{
    //             id: '1',
    //             image: '/images/categories/desktops.webp',
    //             name: 'Paper',
    //             slug: 'paper',
    //             ads: [],
    //             extra_fields: ''
    //         },{
    //             id: '2',
    //             image: '/images/categories/desktops.webp',
    //             name: 'Equipments',
    //             slug: 'equipments',
    //             ads: [],
    //             extra_fields: ''
    //         },
    //     ],
    // }, 
    {
        id: 'xhfkjikpopuwnm',
        name: 'Health & Beauty',
        image: '/images/categories/health-beauty/health-beauty.avif',
        slug: 'health-beauty',
        sub_categories: [
            {
                id: '1',
                image: '/images/categories/health-beauty/cosmetics.avif',
                name: 'Cosmetics',
                slug: 'cosmetics',
                ads: [],
                extra_fields: 'age, gender, skin type'
            },{
                id: '2',
                image: '/images/categories/health-beauty/perfumes.jpg',
                name: 'Perfumes & Deodrants',
                slug: 'perfumes-deodrants',
                ads: [],
                extra_fields: 'age, gender, skin type'
            },{
                id: '3',
                image: '/images/categories/health-beauty/makeup.jpg',
                name: 'Makeup',
                slug: 'makeup',
                ads: [],
                extra_fields: 'age, gender, skin type'
            },{
                id: '4',
                image: '/images/categories/health-beauty/gym.webp',
                name: 'Gym',
                slug: 'gym',
                ads: [],
                extra_fields: 'age, gender'
            },
        ],
    }, 
    // {
    //     // Under review
    //     id: 'xhfkjikpopuwnm',
    //     name: 'Banking & Finance',
    //     image: '/images/categories/desktops.webp',
    //     slug: 'banking-finance',
    //     sub_categories: [
    //         {
    //             id: '1',
    //             image: '/images/categories/desktops.webp',
    //             name: 'Stocks Markets',
    //             slug: 'stock-markets',
    //             ads: [],
    //             extra_fields: ''
    //         },{
    //             id: '2',
    //             image: '/images/categories/desktops.webp',
    //             name: 'Banking',
    //             slug: 'banking',
    //             ads: [],
    //             extra_fields: ''
    //         },{
    //             id: '3',
    //             image: '/images/categories/desktops.webp',
    //             name: 'Credits & Loans',
    //             slug: 'credits-loans',
    //             ads: [],
    //             extra_fields: ''
    //         },
    //     ],
    // }, {
    //     // under review
    //     id: 'xhfkjikpopuwnm',
    //     name: 'Food & Agriculture',
    //     image: '/images/categories/desktops.webp',
    //     slug: 'food-agric',
    //     sub_categories: [
    //         {
    //             id: '1',
    //             image: '/images/categories/desktops.webp',
    //             name: 'Agriculture Products',
    //             slug: 'agric-products',
    //             ads: [],
    //             extra_fields: ''
    //         },{
    //             id: '2',
    //             image: '/images/categories/desktops.webp',
    //             name: 'Domestic Food',
    //             slug: 'domestic-food',
    //             ads: [],
    //             extra_fields: ''
    //         },{
    //             id: '3',
    //             image: '/images/categories/desktops.webp',
    //             name: 'Restaurants',
    //             slug: 'restaurants',
    //             ads: [],
    //             extra_fields: ''
    //         },
    //     ],
    // }, {
    //     id: 'xhfkjikpopuwnm',
    //     name: 'Tools & Gadgets',
    //     image: '/images/categories/desktops.webp',
    //     slug: 'tools-gadgets',
    //     sub_categories: [
    //         {
    //             id: '1',
    //             image: '/images/categories/desktops.webp',
    //             name: 'Domestic',
    //             slug: 'domestic',
    //             ads: [],
    //             extra_fields: 'condition, make, year, faults'
    //         },{
    //             id: '2',
    //             image: '/images/categories/desktops.webp',
    //             name: 'Drones',
    //             slug: 'drones',
    //             ads: [],
    //             extra_fields: 'condition, make, year, faults'
    //         },{
    //             id: '3',
    //             image: '/images/categories/desktops.webp',
    //             name: 'Robots',
    //             slug: 'robots',
    //             ads: [],
    //             extra_fields: 'condition, make, year, faults'
    //         },{
    //             id: '4',
    //             image: '/images/categories/desktops.webp',
    //             name: 'Industrial',
    //             slug: 'industrial',
    //             ads: [],
    //             extra_fields: 'condition, make, year, faults'
    //         },
    //     ],
    // }, {
    //     id: 'xhfkjikpopuwnm',
    //     name: "Leisure & Kid's Play",
    //     image: '/images/categories/desktops.webp',
    //     slug: 'leisure-kids-play',
    //     sub_categories: [
    //         {
    //             id: '1',
    //             image: '/images/categories/desktops.webp',
    //             name: 'Play Ground',
    //             slug: 'play-ground',
    //             ads: [],
    //             extra_fields: ' Condition'
    //         },{
    //             id: '2',
    //             image: '/images/categories/desktops.webp',
    //             name: 'Toys',
    //             slug: 'toys',
    //             ads: [],
    //             extra_fields: ' Condition'
    //         },{
    //             id: '3',
    //             image: '/images/categories/desktops.webp',
    //             slug: 'play-station',
    //             name: 'play Station',
    //             ads: [],
    //             extra_fields: ' Condition'
    //         },
    //     ],
    // }
]

export const ads: Ad[] = [
    {
      id: 'tfyhewi776',
      name: 'Fashion Hat',
      description: 'Great hat for stylists',
      ad_details: '{"negotiable": true, "condition": "Brand New", "color": "Orange", "brand": "Other", "type": "Underwear"}',
      price: 256.99,
      views: 20,
      rating: 3,
      created_at: new Date().toDateString(),
      status: "Active",
      seller_id: 'trtgig',
      ad_images: [
        {
            ad_id: 'tfyhewi776',
            id: 'hhjksjwdu',
            url: '/images/items/hat-1.avif'
        },{
            ad_id: 'tfyhewi776',
            id: 'jiiguhi',
            url: '/images/items/hoodie-1.avif'
        },{
            ad_id: 'tfyhewi776',
            id: 'fdkhg;h',
            url:'/images/items/bomber-jacket-army.avif'
        },{
            ad_id:'tfyhewi776',
            id: "yuulgiiho",
            url: '/images/items/mug-1.avif'
        }
      ]
    },{
        id: 'tfyhewi776',
        name: 'Stylish Jacket',
        description: 'Fantstic jacket for men',
        ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
        price: 76.9,
        views: 110,
        rating: 3,
        created_at: new Date().toDateString(),
        status: "Draft",
        seller_id: '',
        ad_images: [
            {
                ad_id: 'tfyhewi776',
                id: 'jiiguhi',
                url: '/images/items/hoodie-1.avif'
            }
        ]
    },{
        id: 'tfyhewi776',
        name: 'Stylish Jacket',
        description: 'Fantstic jacket for men',
        ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
        price: 76.9,
        views: 223,
        rating: 3,
        created_at: new Date().toDateString(),
        status: "Deleted",
        ad_images: [
            {
                ad_id: 'tfyhewi776',
                id: 'fdkhg;h',
                url:'/images/items/bomber-jacket-army.avif'
            }
        ],
        seller_id: 'dhghj'
      },{
        id: 'tfyhewi776',
        name: 'Stylish Jacket',
        description: 'Fantstic jacket for men',
        ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
        price: 76.9,
        views: 15,
        rating: 3,
        created_at: new Date().toDateString(),
        status: "Active",
        seller_id: 'hugiho',
        ad_images: [
            {
                ad_id:'tfyhewi776',
                id: "yuulgiiho",
                url: '/images/items/mug-1.avif'
            }
        ]
    },{
        id: 'tfyhewi776',
        name: 'Fashion Hat',
        description: 'Great hat for stylists',
        ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
        price: 256.99,
        views: 92,
        rating: 3,
        created_at: new Date().toDateString(),
        status: "Draft",
        seller_id: '',
        ad_images: [
          {
              ad_id: 'tfyhewi776',
              id: 'hhjksjwdu',
              url: '/images/items/hat-1.avif'
          }
        ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          views: 84,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Sold",
          seller_id: '',
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'jiiguhi',
                  url: '/images/items/hoodie-1.avif'
              }
          ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          views: 3345,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'fdkhg;h',
                  url:'/images/items/bomber-jacket-army.avif'
              }
          ],
          seller_id: 'dhghj'
        },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          seller_id: 'hugiho',
          ad_images: [
              {
                  ad_id:'tfyhewi776',
                  id: "yuulgiiho",
                  url: '/images/items/mug-1.avif'
              }
          ]
      },{
        id: 'tfyhewi776',
        name: 'Fashion Hat',
        description: 'Great hat for stylists',
        ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
        price: 256.99,
        rating: 3,
        created_at: new Date().toDateString(),
        status: "Active",
        seller_id: '',
        ad_images: [
          {
              ad_id: 'tfyhewi776',
              id: 'hhjksjwdu',
              url: '/images/items/hat-1.avif'
          }
        ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          seller_id: '',
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'jiiguhi',
                  url: '/images/items/hoodie-1.avif'
              }
          ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'fdkhg;h',
                  url:'/images/items/bomber-jacket-army.avif'
              }
          ],
          seller_id: 'dhghj'
        },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          seller_id: 'hugiho',
          ad_images: [
              {
                  ad_id:'tfyhewi776',
                  id: "yuulgiiho",
                  url: '/images/items/mug-1.avif'
              }
          ]
      },{
        id: 'tfyhewi776',
        name: 'Fashion Hat',
        description: 'Great hat for stylists',
        ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
        price: 256.99,
        rating: 3,
        created_at: new Date().toDateString(),
        status: "Active",
        seller_id: '',
        ad_images: [
          {
              ad_id: 'tfyhewi776',
              id: 'hhjksjwdu',
              url: '/images/items/hat-1.avif'
          }
        ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          seller_id: '',
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'jiiguhi',
                  url: '/images/items/hoodie-1.avif'
              }
          ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'fdkhg;h',
                  url:'/images/items/bomber-jacket-army.avif'
              }
          ],
          seller_id: 'dhghj'
        },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          seller_id: 'hugiho',
          ad_images: [
              {
                  ad_id:'tfyhewi776',
                  id: "yuulgiiho",
                  url: '/images/items/mug-1.avif'
              }
          ]
      },{
        id: 'tfyhewi776',
        name: 'Fashion Hat',
        description: 'Great hat for stylists',
        ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
        price: 256.99,
        rating: 3,
        created_at: new Date().toDateString(),
        status: "Active",
        seller_id: '',
        ad_images: [
          {
              ad_id: 'tfyhewi776',
              id: 'hhjksjwdu',
              url: '/images/items/hat-1.avif'
          }
        ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          seller_id: '',
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'jiiguhi',
                  url: '/images/items/hoodie-1.avif'
              }
          ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'fdkhg;h',
                  url:'/images/items/bomber-jacket-army.avif'
              }
          ],
          seller_id: 'dhghj'
        },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          seller_id: 'hugiho',
          ad_images: [
              {
                  ad_id:'tfyhewi776',
                  id: "yuulgiiho",
                  url: '/images/items/mug-1.avif'
              }
          ]
      },{
        id: 'tfyhewi776',
        name: 'Fashion Hat',
        description: 'Great hat for stylists',
        ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
        price: 256.99,
        rating: 3,
        created_at: new Date().toDateString(),
        status: "Active",
        seller_id: '',
        ad_images: [
          {
              ad_id: 'tfyhewi776',
              id: 'hhjksjwdu',
              url: '/images/items/hat-1.avif'
          }
        ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          seller_id: '',
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'jiiguhi',
                  url: '/images/items/hoodie-1.avif'
              }
          ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'fdkhg;h',
                  url:'/images/items/bomber-jacket-army.avif'
              }
          ],
          seller_id: 'dhghj'
        },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          seller_id: 'hugiho',
          ad_images: [
              {
                  ad_id:'tfyhewi776',
                  id: "yuulgiiho",
                  url: '/images/items/mug-1.avif'
              }
          ]
      },{
        id: 'tfyhewi776',
        name: 'Fashion Hat',
        description: 'Great hat for stylists',
        ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
        price: 256.99,
        rating: 3,
        created_at: new Date().toDateString(),
        status: "Active",
        seller_id: '',
        ad_images: [
          {
              ad_id: 'tfyhewi776',
              id: 'hhjksjwdu',
              url: '/images/items/hat-1.avif'
          }
        ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          seller_id: '',
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'jiiguhi',
                  url: '/images/items/hoodie-1.avif'
              }
          ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'fdkhg;h',
                  url:'/images/items/bomber-jacket-army.avif'
              }
          ],
          seller_id: 'dhghj'
        },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          seller_id: 'hugiho',
          ad_images: [
              {
                  ad_id:'tfyhewi776',
                  id: "yuulgiiho",
                  url: '/images/items/mug-1.avif'
              }
          ]
      },{
        id: 'tfyhewi776',
        name: 'Fashion Hat',
        description: 'Great hat for stylists',
        ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
        price: 256.99,
        rating: 3,
        created_at: new Date().toDateString(),
        status: "Active",
        seller_id: '',
        ad_images: [
          {
              ad_id: 'tfyhewi776',
              id: 'hhjksjwdu',
              url: '/images/items/hat-1.avif'
          }
        ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          seller_id: '',
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'jiiguhi',
                  url: '/images/items/hoodie-1.avif'
              }
          ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'fdkhg;h',
                  url:'/images/items/bomber-jacket-army.avif'
              }
          ],
          seller_id: 'dhghj'
        },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          seller_id: 'hugiho',
          ad_images: [
              {
                  ad_id:'tfyhewi776',
                  id: "yuulgiiho",
                  url: '/images/items/mug-1.avif'
              }
          ]
      },{
        id: 'tfyhewi776',
        name: 'Fashion Hat',
        description: 'Great hat for stylists',
        ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
        price: 256.99,
        rating: 3,
        created_at: new Date().toDateString(),
        status: "Active",
        seller_id: '',
        ad_images: [
          {
              ad_id: 'tfyhewi776',
              id: 'hhjksjwdu',
              url: '/images/items/hat-1.avif'
          }
        ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          seller_id: '',
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'jiiguhi',
                  url: '/images/items/hoodie-1.avif'
              }
          ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'fdkhg;h',
                  url:'/images/items/bomber-jacket-army.avif'
              }
          ],
          seller_id: 'dhghj'
        },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          seller_id: 'hugiho',
          ad_images: [
              {
                  ad_id:'tfyhewi776',
                  id: "yuulgiiho",
                  url: '/images/items/mug-1.avif'
              }
          ]
      },{
        id: 'tfyhewi776',
        name: 'Fashion Hat',
        description: 'Great hat for stylists',
        ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
        price: 256.99,
        rating: 3,
        created_at: new Date().toDateString(),
        status: "Active",
        seller_id: '',
        ad_images: [
          {
              ad_id: 'tfyhewi776',
              id: 'hhjksjwdu',
              url: '/images/items/hat-1.avif'
          }
        ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          seller_id: '',
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'jiiguhi',
                  url: '/images/items/hoodie-1.avif'
              }
          ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'fdkhg;h',
                  url:'/images/items/bomber-jacket-army.avif'
              }
          ],
          seller_id: 'dhghj'
        },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          seller_id: 'hugiho',
          ad_images: [
              {
                  ad_id:'tfyhewi776',
                  id: "yuulgiiho",
                  url: '/images/items/mug-1.avif'
              }
          ]
      },{
        id: 'tfyhewi776',
        name: 'Fashion Hat',
        description: 'Great hat for stylists',
        ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
        price: 256.99,
        rating: 3,
        created_at: new Date().toDateString(),
        status: "Active",
        seller_id: '',
        ad_images: [
          {
              ad_id: 'tfyhewi776',
              id: 'hhjksjwdu',
              url: '/images/items/hat-1.avif'
          }
        ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          seller_id: '',
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'jiiguhi',
                  url: '/images/items/hoodie-1.avif'
              }
          ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'fdkhg;h',
                  url:'/images/items/bomber-jacket-army.avif'
              }
          ],
          seller_id: 'dhghj'
        },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          seller_id: 'hugiho',
          ad_images: [
              {
                  ad_id:'tfyhewi776',
                  id: "yuulgiiho",
                  url: '/images/items/mug-1.avif'
              }
          ]
      },{
        id: 'tfyhewi776',
        name: 'Fashion Hat',
        description: 'Great hat for stylists',
        ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
        price: 256.99,
        rating: 3,
        created_at: new Date().toDateString(),
        status: "Active",
        seller_id: '',
        ad_images: [
          {
              ad_id: 'tfyhewi776',
              id: 'hhjksjwdu',
              url: '/images/items/hat-1.avif'
          }
        ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          seller_id: '',
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'jiiguhi',
                  url: '/images/items/hoodie-1.avif'
              }
          ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'fdkhg;h',
                  url:'/images/items/bomber-jacket-army.avif'
              }
          ],
          seller_id: 'dhghj'
        },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          seller_id: 'hugiho',
          ad_images: [
              {
                  ad_id:'tfyhewi776',
                  id: "yuulgiiho",
                  url: '/images/items/mug-1.avif'
              }
          ]
      },{
        id: 'tfyhewi776',
        name: 'Fashion Hat',
        description: 'Great hat for stylists',
        ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
        price: 256.99,
        rating: 3,
        created_at: new Date().toDateString(),
        status: "Active",
        seller_id: '',
        ad_images: [
          {
              ad_id: 'tfyhewi776',
              id: 'hhjksjwdu',
              url: '/images/items/hat-1.avif'
          }
        ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          seller_id: '',
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'jiiguhi',
                  url: '/images/items/hoodie-1.avif'
              }
          ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'fdkhg;h',
                  url:'/images/items/bomber-jacket-army.avif'
              }
          ],
          seller_id: 'dhghj'
        },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          seller_id: 'hugiho',
          ad_images: [
              {
                  ad_id:'tfyhewi776',
                  id: "yuulgiiho",
                  url: '/images/items/mug-1.avif'
              }
          ]
      },{
        id: 'tfyhewi776',
        name: 'Fashion Hat',
        description: 'Great hat for stylists',
        ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
        price: 256.99,
        rating: 3,
        created_at: new Date().toDateString(),
        status: "Active",
        seller_id: '',
        ad_images: [
          {
              ad_id: 'tfyhewi776',
              id: 'hhjksjwdu',
              url: '/images/items/hat-1.avif'
          }
        ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          seller_id: '',
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'jiiguhi',
                  url: '/images/items/hoodie-1.avif'
              }
          ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'fdkhg;h',
                  url:'/images/items/bomber-jacket-army.avif'
              }
          ],
          seller_id: 'dhghj'
        },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          seller_id: 'hugiho',
          ad_images: [
              {
                  ad_id:'tfyhewi776',
                  id: "yuulgiiho",
                  url: '/images/items/mug-1.avif'
              }
          ]
      },{
        id: 'tfyhewi776',
        name: 'Fashion Hat',
        description: 'Great hat for stylists',
        ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
        price: 256.99,
        rating: 3,
        created_at: new Date().toDateString(),
        status: "Active",
        seller_id: '',
        ad_images: [
          {
              ad_id: 'tfyhewi776',
              id: 'hhjksjwdu',
              url: '/images/items/hat-1.avif'
          }
        ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          seller_id: '',
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'jiiguhi',
                  url: '/images/items/hoodie-1.avif'
              }
          ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'fdkhg;h',
                  url:'/images/items/bomber-jacket-army.avif'
              }
          ],
          seller_id: 'dhghj'
        },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          seller_id: 'hugiho',
          ad_images: [
              {
                  ad_id:'tfyhewi776',
                  id: "yuulgiiho",
                  url: '/images/items/mug-1.avif'
              }
          ]
      },{
        id: 'tfyhewi776',
        name: 'Fashion Hat',
        description: 'Great hat for stylists',
        ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
        price: 256.99,
        rating: 3,
        created_at: new Date().toDateString(),
        status: "Active",
        seller_id: '',
        ad_images: [
          {
              ad_id: 'tfyhewi776',
              id: 'hhjksjwdu',
              url: '/images/items/hat-1.avif'
          }
        ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          seller_id: '',
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'jiiguhi',
                  url: '/images/items/hoodie-1.avif'
              }
          ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'fdkhg;h',
                  url:'/images/items/bomber-jacket-army.avif'
              }
          ],
          seller_id: 'dhghj'
        },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          seller_id: 'hugiho',
          ad_images: [
              {
                  ad_id:'tfyhewi776',
                  id: "yuulgiiho",
                  url: '/images/items/mug-1.avif'
              }
          ]
      },{
        id: 'tfyhewi776',
        name: 'Fashion Hat',
        description: 'Great hat for stylists',
        ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
        price: 256.99,
        rating: 3,
        created_at: new Date().toDateString(),
        status: "Active",
        seller_id: '',
        ad_images: [
          {
              ad_id: 'tfyhewi776',
              id: 'hhjksjwdu',
              url: '/images/items/hat-1.avif'
          }
        ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          seller_id: '',
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'jiiguhi',
                  url: '/images/items/hoodie-1.avif'
              }
          ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'fdkhg;h',
                  url:'/images/items/bomber-jacket-army.avif'
              }
          ],
          seller_id: 'dhghj'
        },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          seller_id: 'hugiho',
          ad_images: [
              {
                  ad_id:'tfyhewi776',
                  id: "yuulgiiho",
                  url: '/images/items/mug-1.avif'
              }
          ]
      },{
        id: 'tfyhewi776',
        name: 'Fashion Hat',
        description: 'Great hat for stylists',
        ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
        price: 256.99,
        rating: 3,
        created_at: new Date().toDateString(),
        status: "Active",
        seller_id: '',
        ad_images: [
          {
              ad_id: 'tfyhewi776',
              id: 'hhjksjwdu',
              url: '/images/items/hat-1.avif'
          }
        ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          seller_id: '',
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'jiiguhi',
                  url: '/images/items/hoodie-1.avif'
              }
          ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'fdkhg;h',
                  url:'/images/items/bomber-jacket-army.avif'
              }
          ],
          seller_id: 'dhghj'
        },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          rating: 3,
          created_at: new Date().toDateString(),
          status: "Active",
          seller_id: 'hugiho',
          ad_images: [
              {
                  ad_id:'tfyhewi776',
                  id: "yuulgiiho",
                  url: '/images/items/mug-1.avif'
              }
          ]
      },
]

export const stores: Store[] = [
    {
        id: 'kklk',
        keeper: {
            id: 'y8upi',
            about: '',
            firstName: 'Lubega',
        },
        created_at: today.toDateString(),
        name: 'Lubega Dears',
        image: '/images/stores/lubega.jpeg',
        ads: [
            {
                id: 'jinm',
                name: "My Ad",
                description: "Some awesom ad",
                price: 789,
                ad_images: [],
                seller_id: 'yruewojef'
            },{
                id: 'jinm',
                name: "My Ad",
                description: "Some awesom ad",
                price: 789,
                ad_images: [],
                seller_id: 'yruewojef'
            },{
                id: 'jinm',
                name: "My Ad",
                description: "Some awesom ad",
                price: 789,
                ad_images: [],
                seller_id: 'yruewojef'
            },
        ]
    },{
        id: 'kklk',
        keeper: {
            id: 'y8upi',
            about: '',
            firstName: 'Jim'
        },
        created_at: today.toDateString(),
        name: 'Smart Dearler',
        image: '/images/stores/smart.jpeg',
        ads: [
            {
                id: 'jinm',
                name: "My Ad",
                description: "Some awesom ad",
                price: 789,
                ad_images: [],
                seller_id: 'yruewojef'
            },{
                id: 'jinm',
                name: "My Ad",
                description: "Some awesom ad",
                price: 789,
                ad_images: [],
                seller_id: 'yruewojef'
            },
        ]
    },{
        id: 'kklk',
        keeper: {
            id: 'y8upi',
            about: '',
            firstName: 'Joan'
        },
        created_at: today.toDateString(),
        name: 'Pride Phamarcy',
        image: '/images/stores/phamarcy.jpg',
        ads: [
            {
                id: 'jinm',
                name: "My Ad",
                description: "Some awesom ad",
                price: 789,
                ad_images: [],
                seller_id: 'yruewojef'
            },{
                id: 'jinm',
                name: "My Ad",
                description: "Some awesom ad",
                price: 789,
                ad_images: [],
                seller_id: 'yruewojef'
            },{
                id: 'jinm',
                name: "My Ad",
                description: "Some awesom ad",
                price: 789,
                ad_images: [],
                seller_id: 'yruewojef'
            },{
                id: 'jinm',
                name: "My Ad",
                description: "Some awesom ad",
                price: 789,
                ad_images: [],
                seller_id: 'yruewojef'
            },{
                id: 'jinm',
                name: "My Ad",
                description: "Some awesom ad",
                price: 789,
                ad_images: [],
                seller_id: 'yruewojef'
            },
        ]
    },{
        id: 'kklk',
        keeper: {
            id: 'y8upi',
            about: '',
            firstName: 'Dick'
        },
        created_at: today.toDateString(),
        name: 'Suubi General Stores',
        image: '/images/stores/suubi.jpeg',
        ads: [
            {
                id: 'jinm',
                name: "My Ad",
                description: "Some awesom ad",
                price: 789,
                ad_images: [],
                seller_id: 'yruewojef'
            },{
                id: 'jinm',
                name: "My Ad",
                description: "Some awesom ad",
                price: 789,
                ad_images: [],
                seller_id: 'yruewojef'
            },{
                id: 'jinm',
                name: "My Ad",
                description: "Some awesom ad",
                price: 789,
                ad_images: [],
                seller_id: 'yruewojef'
            },{
                id: 'jinm',
                name: "My Ad",
                description: "Some awesom ad",
                price: 789,
                ad_images: [],
                seller_id: 'yruewojef'
            },{
                id: 'jinm',
                name: "My Ad",
                description: "Some awesom ad",
                price: 789,
                ad_images: [],
                seller_id: 'yruewojef'
            },{
                id: 'jinm',
                name: "My Ad",
                description: "Some awesom ad",
                price: 789,
                ad_images: [],
                seller_id: 'yruewojef'
            },{
                id: 'jinm',
                name: "My Ad",
                description: "Some awesom ad",
                price: 789,
                ad_images: [],
                seller_id: 'yruewojef'
            },{
                id: 'jinm',
                name: "My Ad",
                description: "Some awesom ad",
                price: 789,
                ad_images: [],
                seller_id: 'yruewojef'
            },
        ]
    },{
        id: 'kklk',
        keeper: {
            id: 'y8upi',
            about: '',
            firstName: 'Davy'
        },
        created_at: today.toDateString(),
        name: 'Smart Phones Collection',
        image: '/images/stores/phones.jpg',
        ads: [
            {
                id: 'jinm',
                name: "My Ad",
                description: "Some awesom ad",
                price: 789,
                ad_images: [],
                seller_id: 'yruewojef'
            },
        ]
    }
]

export const dealers: Profile[] = []

export const messages: ChatMessage[] = [
    {
        id: "rjejr",
        to: "hyuoi",
        from: 'uiuoo',
        body: {
            message_id: 'rjejr',
            text: "Hello boss",
            id: "hkje"
        },
        chat_id: '',
        type: "Text"
    },{
        id: "ewerjejr",
        to: "uiuoo",
        from: 'hyuoi',
        body: {
            message_id: 'ewerjejr',
            text: "Hello, How a you",
            id: "hkje"
        },
        chat_id: '',
        type: "Text"
    },{
        id: "rjfeejr",
        chat_id: "",
        to: "hyuoi",
        from: 'uiuoo',
        body: {
            message_id: 'rjfeejr',
            text: "I'm fine, can we deal?",
            id: "hkje"
        },
        type: "Text"
    },{
        id: "rjewfjr",
        chat_id: "",
        to: "uiuoo",
        from: 'hyuoi',
        body: {
            message_id: 'rjewfjr',
            text: "Sure, that fine go on tell me about the deal.",
            id: "hkje"
        },
        type: "Text"
    }
]

export const chats: Chat[] = [
    {
        ad_name: "Stylish Jacket",
        messages: messages,
        id: 'u890'
    },{
        ad_name: "Subaru forest 2000",
        messages: [
            {
                body: {
                    message_id: 'jop',
                    id: 'kjok',
                    text: 'This is a cool ride man, take it up'
                },
                chat_id:'uonn890',
                from: 'jiok',
                id: 'jop',
                to: 'hyuoi',
                type: "Text"
            }
        ],
        id: 'uonn890'
    },{
        ad_name: "House for sale",
        messages: [],
        id: 'u8iip90'
    }
]

export const alerts: Notification[] = [
    {
        id: "jeir",
        to_id: "jewreooe",
        message: "Check out these amazing ads",
        date: setDate(),
        status: "Unread"
    },{
        id: "jeir",
        to_id: "jewreooe",
        message: "Two unread messages",
        date: setDate(),
        status: "Read"
    },{
        id: "jeir",
        to_id: "jewreooe",
        message: "Promot your ads to bost your sales",
        date: setDate(),
        status: "Read"
    },{
        id: "jeir",
        to_id: "jewreooe",
        message: "One unread messages",
        date: setDate(),
        status: "Read"
    },{
        id: "jeir",
        to_id: "jewreooe",
        message: "Finish your profile settings",
        date: setDate(),
        status: "Unread"
    },{
        id: "jeir",
        to_id: "jewreooe",
        message: "Checkout these amzing offers",
        date: setDate(),
        status: "Read"
    },{
        id: "jeir",
        to_id: "jewreooe",
        message: "These ads may amze you",
        date: setDate(),
        status: "Unread"
    },{
        id: "jeir",
        to_id: "jewreooe",
        message: "Two unread feedbacks",
        date: setDate(),
        status: "Unread"
    },{
        id: "jeir",
        to_id: "jewreooe",
        message: "A client messaged you",
        date: setDate(),
        status: "Read"
    },{
        id: "jeir",
        to_id: "jewreooe",
        message: "Two unread messages",
        date: setDate(),
        status: "Read"
    },
]

export const trashItems: any[] = [
    {
        id: 'kklk',
        keeper: {
            id: 'y8upi',
            about: '',
            firstName: 'Dick'
        },
        trashed_at: setDate().toDateString(),
        deleted_at: null,
        created_at: setDate().toDateString(),
        name: 'Suubi General Stores',
        image: '/images/stores/suubi.jpeg',
        ads: []
    },{
        id: 'kklk',
        keeper: {
            id: 'y8upi',
            about: '',
            firstName: 'Davy'
        },
        trashed_at: setDate().toDateString(),
        deleted_at: null,
        created_at: setDate().toDateString(),
        name: 'Smart Phones Collection',
        image: '/images/stores/phones.jpg',
        ads: []
    }, {
        id: 'tfyhewi776',
        name: 'Fashion Hat',
        description: 'Great hat for stylists',
        ad_details: '{"negotiable": true, "condition": "Brand New", "color": "Orange", "brand": "Other", "type": "Underwear"}',
        price: 256.99,
        views: 20,
        rating: 3,
        trashed_at: setDate().toDateString(),
        deleted_at: null,
        created_at: setDate().toDateString(),
        status: "Active",
        seller_id: 'trtgig',
        ad_images: [
          {
              ad_id: 'tfyhewi776',
              id: 'hhjksjwdu',
              url: '/images/items/hat-1.avif'
          },{
              ad_id: 'tfyhewi776',
              id: 'jiiguhi',
              url: '/images/items/hoodie-1.avif'
          },{
              ad_id: 'tfyhewi776',
              id: 'fdkhg;h',
              url:'/images/items/bomber-jacket-army.avif'
          },{
              ad_id:'tfyhewi776',
              id: "yuulgiiho",
              url: '/images/items/mug-1.avif'
          }
        ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          views: 110,
          rating: 3,
          trashed_at: setDate().toDateString(),
          deleted_at: null,
          created_at: setDate().toDateString(),
          status: "Draft",
          seller_id: '',
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'jiiguhi',
                  url: '/images/items/hoodie-1.avif'
              }
          ]
      },{
          id: 'tfyhewi776',
          name: 'Stylish Jacket',
          description: 'Fantstic jacket for men',
          ad_details: '{negotiable: true, condition: "Brand New", color: "Orange", brand: "Other", type: "Underwear"}',
          price: 76.9,
          views: 223,
          rating: 3,
          trashed_at: setDate().toDateString(),
          deleted_at: null,
          created_at: setDate().toDateString(),
          status: "Deleted",
          ad_images: [
              {
                  ad_id: 'tfyhewi776',
                  id: 'fdkhg;h',
                  url:'/images/items/bomber-jacket-army.avif'
              }
          ],
          seller_id: 'dhghj'
        }
]

export const feedbacks: Feedback[] = [
    {
        ad_id: '',
        ad: {
            name: "Range Rover Sport 2020"
        },
        id: "",
        sender_id: "",
        sender: {
            name: "Egessa Davis"
        },
        message: "This is an awasome car"
    },{
        ad_id: '',
        ad: {
            name: "Toyota Land Cruiser VX 2020"
        },
        id: "",
        sender_id: "",
        sender: {
            name: "Egessa Davis"
        },
        message: "This is an awasome car"
    },{
        ad_id: '',
        ad: {
            name: "Pajero Sport 2022"
        },
        id: "",
        sender_id: "",
        sender: {
            name: "Egessa Davis"
        },
        message: "This is an awasome car"
    },{
        ad_id: '',
        ad: {
            name: "Jeep Grand Cheroke Sport 2020"
        },
        id: "",
        sender_id: "",
        sender: {
            name: "Egessa Davis"
        },
        message: "This is an awasome car"
    },
]
  

