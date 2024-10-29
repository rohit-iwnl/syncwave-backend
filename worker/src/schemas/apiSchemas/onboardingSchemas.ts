import { z } from 'zod';

const onboardingSchemas = Object.freeze({
    createUser : z.object({
        name : z.string().min(4)
    })
});


export default onboardingSchemas;
