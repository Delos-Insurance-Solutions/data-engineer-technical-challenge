import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';

@Controller('agents')
export class AgentsController {
  /**
   * Deliverable 3. Return the reconciled agent for this NPN, with their
   * licenses and agency, to a caller outside the company.
   *
   * Authentication is yours to add; the key lives in API_KEY.
   */
  @Get(':npn')
  findByNpn(@Param('npn') npn: string): never {
    throw new HttpException(
      {
        statusCode: HttpStatus.NOT_IMPLEMENTED,
        error: 'Not Implemented',
        message: `GET /agents/${npn} is a stub. Implement it in src/agents/agents.controller.ts.`,
      },
      HttpStatus.NOT_IMPLEMENTED,
    );
  }
}
