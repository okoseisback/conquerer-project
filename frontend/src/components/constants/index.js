
const CATEGORY_NAME = {
    MY_POST: 'My Post',
    LAST_POST: 'Last Post',
    BUSINESS: 'Business',
    MONEY: 'Money',
    TECHNOLOGY: 'Technology',
    ARTIFICAL_INTELLIGENCE: 'Artificial Intelligence',
}

const CATEGORIES = [
    {
        name: CATEGORY_NAME.BUSINESS
    },
    {
        name: CATEGORY_NAME.MONEY
    },
    {
        name: CATEGORY_NAME.TECHNOLOGY
    },
    {
        name: CATEGORY_NAME.ARTIFICAL_INTELLIGENCE
    }
];

const DEF_TAB_CATEGORIES = [
    {
        name: CATEGORY_NAME.MY_POST
    },
    {
        name: CATEGORY_NAME.LAST_POST
    },
    ...CATEGORIES
];

const DEF_TAB_CATEGORY_NAME = CATEGORY_NAME.MY_POST

export default {
    CATEGORY_NAME,
    CATEGORIES,
    DEF_TAB_CATEGORIES,
    DEF_TAB_CATEGORY_NAME
};