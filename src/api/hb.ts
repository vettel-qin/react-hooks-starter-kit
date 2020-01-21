/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
import request from '~/core/request';
const baseUrl = process.env.REACT_APP_API_SCRM;

export function getAntifakeIntegralById(data: any) {
  return request.get('/antifakecode/getAntifakeIntegralById', {
    params: data,
    baseUrl,
    json: true,
    type: 'json',
    mode: 'cors',
  });
}

export function createMemberUseCouponsRecord(data: any) {
  return request.post('/marketing/individual/createMemberUseCouponsRecord', data, {
    baseUrl,
    json: true,
    type: 'json',
    mode: 'cors',
  });
}

export function findEmployeeById(data: any) {
  return request.get('/employee/findEmployeeById', {
    params: data,
    baseUrl,
    json: true,
    type: 'json',
    mode: 'cors',
  });
}
