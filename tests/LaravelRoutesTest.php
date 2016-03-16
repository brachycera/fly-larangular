<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class LaravelRoutesTest extends TestCase
{
    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testLandingResponseCode()
    {
        $response = $this->call('GET', '/');
        $this->assertEquals(200, $response->status());
    }
    public function index()
    {
        if (! $this->authUser) {
            $this->setAuthUserToken();
        }
        return $this->authUser;
    }
}
