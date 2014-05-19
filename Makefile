TESTS = test/*.js

test:
    @NODE_ENV=test ./node_modules/.bin/mocha \
            --reporter list \
            --slow 20 \
            --growl \
            --ui tdd \
            $(TESTS)
