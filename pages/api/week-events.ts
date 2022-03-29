// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {ContextEventsDetails} from '../api-types/weekResponse';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ContextEventsDetails | string>
) {
    try {
        const hasQueryParam = (req.url || '').indexOf('?') >= 0 || false;
        const queryParams = hasQueryParam
            ? req.url?.substring(req.url?.indexOf('?'))
            : '';
        const response = await fetch(`${process.env.API_WEEKLY_PATH!}${queryParams}`, {
            headers: {
                'X-API-Key': process.env.API_KEY!
            }
        });

        if (response.status === 200)
            res.status(200).json(await response.json())
    } catch (e) {
        res.status(500).send(`${e}`);
    }

}
