import { z } from 'zod';

const onboardingSchemas = Object.freeze({
    createUser : z.object({
        name : z.string().min(4)
    }),
    
    setPreferences : z.object({
        lease_sublease_property : z.boolean(),
        find_roomate : z.boolean(),
        sell_buy_product : z.boolean(),
        here_to_explore : z.boolean()
    })
});


export default onboardingSchemas;
