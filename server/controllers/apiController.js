// NK: I still don't know when/why node-fetch is ever required. Let's try without.
// import fetch from 'node-fetch';
import createErr from '../utils/errorHandler';
import { checkRequiredProps, checkTypes } from '../utils/bodyValidator';

const apiController = {};

apiController.validateBody = (req, res, next) => {
  try {
    console.log(req.body);
    const missingProps = checkRequiredProps(req.body);
    if (missingProps) throw new Error(missingProps);
    const invalidTypes = checkTypes(req.body);
    if (invalidTypes) throw new Error(invalidTypes);
  } catch (err) {
    return next(createErr('apiController', 'validateBody', err, 400));
  }
};

export default apiController;
