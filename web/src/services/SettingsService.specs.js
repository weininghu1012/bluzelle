import {setMaxNodes} from 'services/SettingsService'
import {commandProcessors} from 'services/CommunicationService'

describe('services/SettingsService', () => {
    it('should add a "setMaxNodes" command processor on startup', () => {
        expect(commandProcessors.setMaxNodes).not.to.be.undefined
    })
});